import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  S3Client,
  PutObjectCommand,
  PutObjectAclCommand,
  GetObjectAclOutput,
  GetObjectAclCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
        secretAccessKey: this.configService.get<string>(
          "AWS_SECRET_ACCESS_KEY",
        ),
      },
    });
  }

  async uploadFile(fileName: string, fileBuffer: Buffer): Promise<string> {
    const uploadCommand = new PutObjectCommand({
      Bucket: this.configService.get<string>("AWS_BUCKET_NAME"),
      Key: `User/${fileName}`,
      Body: fileBuffer,
    });

    await this.s3.send(uploadCommand);

    const url = await getSignedUrl(this.s3, uploadCommand, { expiresIn: 3600 });

    return url;
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

  async checkObjectAcl(imageKey: string): Promise<boolean> {
    console.log("imageKey: ", imageKey);
    const command = new GetObjectAclCommand({
      Bucket: this.configService.get<string>("AWS_BUCKET_NAME"),
      Key: imageKey,
    });

    const result = await this.s3.send(command);
    const isPublicRead = (result as GetObjectAclOutput).Grants.some(
      (grant) =>
        grant.Permission === "READ" &&
        grant.Grantee.URI === "http://acs.amazonaws.com/groups/global/AllUsers",
    );

    return isPublicRead;
  }

  async ensureImageIsPublic(imageKey: string): Promise<void> {
    const isPublicRead = await this.checkObjectAcl(imageKey);

    if (!isPublicRead) {
      await this.updateImageAcl(imageKey);
    }
  }
}
