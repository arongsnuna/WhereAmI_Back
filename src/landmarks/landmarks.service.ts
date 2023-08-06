import { Injectable } from "@nestjs/common";
import { LandmarkRepository } from "./landmarks.repository";
import { GetLandmarkDto } from "./dto/landmark.request.dto";
import { S3Service } from "src/common/s3/s3.service";
import { LandmarkResponseDto } from "./dto/landmark.response.dto";
import { getImagePath } from "src/common/s3/s3.utils";
import { plainToClass } from "class-transformer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LandmarkService {
  constructor(
    private readonly landmarkRepo: LandmarkRepository,
    private readonly s3Service: S3Service,
    private configService: ConfigService,
  ) {}

  //해당 랜드마크 정보 추출 (이름으로 검색)
  async getLandmarkByName(getLandmarkDto: GetLandmarkDto): Promise<LandmarkResponseDto> {
    let landmark = await this.landmarkRepo.findLandmarkByName(getLandmarkDto);
    if (!landmark) {
      throw new Error("Landmark not found");
    }
    // DB imagePath 업데이트
    if (landmark.fileName == landmark.imagePath) {
      // S3 Public권한 주기, imagePath 설정하기
      await this.s3Service.ensureImageIsPublic(landmark.fileName);
      landmark.imagePath = getImagePath(this.configService, landmark.imagePath);
      // DB imagePath 업데이트
      const updateLandmark = await this.landmarkRepo.updateImagePath(landmark.name, landmark.imagePath);
      landmark = updateLandmark;
    }

    return plainToClass(LandmarkResponseDto, landmark);
  }

  //주변 랜드마크 정보 추출 (지역ID로 검색 - 상위 5개)
  async getNearByLandmarksByArea(areaId: number): Promise<LandmarkResponseDto[]> {
    const landmarks = await this.landmarkRepo.getNearByLandmarksByAreaId(areaId);
    if (!landmarks) {
      throw new Error("Landmark not found");
    }

    //파일명 이름으로이미지 경로 업데이트
    const updatedLandmarksPromises = landmarks.map(async (landmark) => {
      try {
        // DB imagePath 업데이트
        if (landmark.fileName == landmark.imagePath) {
          // S3 Public권한 주기, imagePath 설정하기
          await this.s3Service.ensureImageIsPublic(landmark.fileName);
          landmark.imagePath = getImagePath(this.configService, landmark.imagePath);
          // DB imagePath 업데이트
          const updateLandmark = await this.landmarkRepo.updateImagePath(landmark.name, landmark.imagePath);
          landmark = updateLandmark;
        }
        return landmark;
      } catch (error) {
        console.error(error);
        return null;
      }
    });

    const updatedLandmarks = await Promise.all(updatedLandmarksPromises);
    const validLandmarks = updatedLandmarks.filter(Boolean);

    return validLandmarks.map((landmark) => plainToClass(LandmarkResponseDto, landmark));
  }
}
