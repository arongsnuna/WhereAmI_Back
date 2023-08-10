import { BadRequestException, Controller, InternalServerErrorException, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImagesService } from "./images.service";
import { memoryStorage } from "multer";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import LandmarkResponse from "src/docs/landmarks/landmarks.swagger";
import * as Config from "config";
import { LandmarkResponseDto } from "src/landmarks/dto/landmark.response.dto";

const size = Config.get<{ filesize: number }>("IMAGE").filesize;
@ApiTags("image")
@Controller("image")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  //이미지 업로드
  @Post()
  @ApiOperation({ summary: "Get a landmark by name" })
  @ApiResponse(LandmarkResponse)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: size }, // 5MB 제한
    }),
  )
  async uploadImage(@UploadedFile("file") file: Express.Multer.File): Promise<{
    landmark: LandmarkResponseDto;
    nearByLandmarks: LandmarkResponseDto[];
  }> {
    try {
      if(!file) throw new BadRequestException("이미지 데이터가 유효하지 않거나 누락되었습니다.")
      const imageBuffer = file.buffer;

      //이미지 from BE to AI
      const landmarkName = await this.imagesService.sendImageToAi(imageBuffer); // server to AI and AI to server

      //ai 결과 반환
      const landmarkInfo = await this.imagesService.getLandmarkInfo(landmarkName); // server to client
     
      return landmarkInfo;
    }
    catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`)
    }
  }
}
