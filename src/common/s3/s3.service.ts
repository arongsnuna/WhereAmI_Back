import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  S3Client,
  PutObjectCommand,
  PutObjectAclCommand,
  GetObjectAclOutput,
  GetObjectAclCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as mime from "mime";

@Injectable()
export class S3Service {
  static updateImageAcl(fileName: string) {
    throw new Error("Method not implemented.");
  }
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>("AWS_REGION"),
      credentials: {
        accessKeyId: this.configService.get<string>("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.get<string>("AWS_SECRET_ACCESS_KEY"),
      },
    });
  }

  async uploadFile(fileBuffer: Buffer, fileNameKey: string, folder: string = "User"): Promise<string> {
    const uploadCommand = new PutObjectCommand({
      Bucket: this.configService.get<string>("AWS_BUCKET_NAME"),
      Key: `${folder}/${fileNameKey}`,
      Body: fileBuffer,
      ACL: "public-read",
    });

    await this.s3.send(uploadCommand);
    const url = await getSignedUrl(this.s3, uploadCommand, { expiresIn: 3600 });

    return url;
  }

  // URL을 이용하여 삭제
  async deleteFileByUrl(url: string): Promise<void> {
    const parsedUrl = new URL(url);
    const bucket = parsedUrl.hostname.split(".")[0];
    const key = parsedUrl.pathname.substring(1); // 첫 번째 슬래시 제거
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    try {
      await this.s3.send(deleteCommand);
    } catch (error) {
      throw new InternalServerErrorException(`s3 서버 오류 - ${error}`)
    }
  }

  // filkey를 이용하여 삭제
  async deleteFile(fileNameKey: string): Promise<void> {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: this.configService.get<string>("AWS_BUCKET_NAME"),
      Key: fileNameKey,
    });

    try {
      await this.s3.send(deleteCommand);
    } catch (error) {
      throw new InternalServerErrorException(`s3 서버 오류 - ${error}`)
    }
  }

  // file name generate
  generateUniqueFileName(originalName: string): string {
    const timestamp = Date.now();
    return `${timestamp}_${originalName}`;
  }

  // file 유효성 검사
  validateImageFile(originalName: string): boolean {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/bmp", "image/gif", "image/webp"];
    const mimeType = mime.getType(originalName);
    return mimeType && allowedMimeTypes.includes(mimeType);
  }

  // CLI(액세스 제어 목록) Public Read 설정
  async updateImageAcl(imageKey: string): Promise<void> {
    const aclCommand = new PutObjectAclCommand({
      Bucket: this.configService.get<string>("AWS_BUCKET_NAME"),
      Key: imageKey,
      ACL: "public-read",
    });

    await this.s3.send(aclCommand);
  }

  //ACL check
  async checkObjectAcl(imageKey: string): Promise<boolean> {
    const command = new GetObjectAclCommand({
      Bucket: this.configService.get<string>("AWS_BUCKET_NAME"),
      Key: imageKey,
    });

    const result = await this.s3.send(command);
    const isPublicRead = (result as GetObjectAclOutput).Grants.some(
      (grant) => grant.Permission === "READ" && grant.Grantee.URI === "http://acs.amazonaws.com/groups/global/AllUsers",
    );

    return isPublicRead;
  }

  //ACL set : S3에 업로드된 이미지의 Public Read권한 주기
  async ensureImageIsPublic(imageKey: string): Promise<void> {
    const isPublicRead = await this.checkObjectAcl(imageKey);

    if (!isPublicRead) {
      await this.updateImageAcl(imageKey);
    }
  }
}
