import { Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { LandmarkRepository } from "./landmarks.repository";
import { GetLandmarkDto } from "./dto/landmark.request.dto";
import { S3Service } from "src/common/s3/s3.service";
import { LandmarkResponseDto } from "./dto/landmark.response.dto";
import { plainToClass } from "class-transformer";

@Injectable()
export class LandmarkService {
  constructor(
    private readonly landmarkRepo: LandmarkRepository,
    private readonly s3Service: S3Service,
  ) {}

  //해당 랜드마크 정보 추출 (이름으로 검색)
  async getLandmarkByName(getLandmarkDto: GetLandmarkDto): Promise<LandmarkResponseDto> {
    try {
      let landmark = await this.landmarkRepo.findLandmarkByName(getLandmarkDto);
      if (!landmark || landmark == undefined) {
        throw new NotFoundException("해당 랜드마크를 불러올 수 없습니다.");
      }

      // S3 Public권한 주기
      await this.s3Service.ensureImageIsPublic(landmark.fileName);

      return plainToClass(LandmarkResponseDto, landmark);
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.");
    }
  }

  //주변 랜드마크 정보 추출 (지역ID로 검색 - 상위 5개)
  async getNearByLandmarksByArea(name: string, areaId: number): Promise<LandmarkResponseDto[]> {
    const landmarks = await this.landmarkRepo.getNearByLandmarksByAreaId(name, areaId);
    if (!landmarks || landmarks == undefined) {
      throw new NotFoundException("주변 랜드마크를 불러올 수 없습니다.");
    }
    try {
      //파일명 이름으로이미지 경로 업데이트
      const updatedLandmarksPromises = landmarks.map(async (landmark) => {
        // S3 Public권한 주기
        await this.s3Service.ensureImageIsPublic(landmark.fileName);

        return landmark;
      });
      if (!updatedLandmarksPromises || updatedLandmarksPromises == undefined) {
        throw new ServiceUnavailableException("s3 서비스에 문제가 생겼습니다.");
      }

      const updatedLandmarks = await Promise.all(updatedLandmarksPromises);
      const validLandmarks = updatedLandmarks.filter(Boolean);

      return validLandmarks.map((landmark) => plainToClass(LandmarkResponseDto, landmark));
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.");
    }
  }
}
