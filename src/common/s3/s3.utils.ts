import { ConfigService } from "@nestjs/config";
import { GetLandmarkDto } from "src/landmarks/dto/landmark.request.dto";

//S3의 랜드마크 대표 이미지 imagePath 설정
function getImagePath(configService: ConfigService, imageName: string): string {
  const bucketName = configService.get<string>("AWS_BUCKET_NAME");
  const region = configService.get<string>("AWS_REGION");
  const imagePath = `https://${bucketName}.s3.${region}.amazonaws.com/${imageName}`;
  return imagePath;
}

//S3의 유저 프로필 이미지 imagePath 설정
function getUserImagePath(configService: ConfigService, getLandmarkDto: GetLandmarkDto): string {
  const bucketName = configService.get<string>("AWS_BUCKET_NAME");
  const region = configService.get<string>("AWS_REGION");
  const fileName = encodeURIComponent(getLandmarkDto.name);
  const imagePath = `https://${bucketName}.s3.${region}.amazonaws.com/User/${fileName}`;
  return imagePath;
}

export { getImagePath, getUserImagePath };
