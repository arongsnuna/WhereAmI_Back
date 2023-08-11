import { ConfigService } from "@nestjs/config";
import { GetLandmarkDto } from "src/landmarks/dto/landmark.request.dto";

//대표사진 경로
function getImagePath(configService: ConfigService, imageName: string): string {
  const bucketName = configService.get<string>("AWS_BUCKET_NAME");
  const region = configService.get<string>("AWS_REGION");
  const imagePath = `https://${bucketName}.s3.${region}.amazonaws.com/${imageName}`;
  return imagePath;
}

//검색용 폴더
function getUserImagePath(
  configService: ConfigService,
  getLandmarkDto: GetLandmarkDto,
): string {
  const bucketName = configService.get<string>("AWS_BUCKET_NAME");
  const region = configService.get<string>("AWS_REGION");
  const fileName = encodeURIComponent(getLandmarkDto.name);
  const imagePath = `https://${bucketName}.s3.${region}.amazonaws.com/User/${fileName}`;
  return imagePath;
}

export { getImagePath, getUserImagePath };
