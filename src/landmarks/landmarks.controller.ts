import { Controller, Get, Param, UseInterceptors, UploadedFile, InternalServerErrorException } from "@nestjs/common";
import { LandmarkService } from "./landmarks.service";
import { GetLandmarkDto } from "./dto/landmark.request.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LandmarkResponseDto } from "./dto/landmark.response.dto";
import LandmarkResponse from "src/docs/landmarks/landmarks.swagger";

@ApiTags("landmark")
@Controller("landmark")
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}

  //랜드마크 페이지 로드
  @Get(":name")
  @ApiParam({
    name: "name",
    required: true,
    description: "The name of the landmark",
  })
  @ApiOperation({ summary: "Get a landmark by name" })
  @ApiResponse(LandmarkResponse)
  async getLandmark(@Param() getLandmarkDto: GetLandmarkDto): Promise<{
    landmark: LandmarkResponseDto;
    nearByLandmarks: LandmarkResponseDto[];
  }> {
    try {
    //해당 랜드마크 정보 추출
    const landmark: LandmarkResponseDto = await this.landmarkService.getLandmarkByName(getLandmarkDto);

    //근처 랜드마크 리스트 추출
    const nearByLandmarks = await this.landmarkService.getNearByLandmarksByArea(landmark.name, landmark.areaId);

    return { landmark, nearByLandmarks };
    }
    catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`)
    }

  }
}
