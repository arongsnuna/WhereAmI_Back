import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImagesService } from "./images.service";
import { memoryStorage } from "multer";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import LandmarkResponse from "src/docs/landmarks/landmarks.swagger";
import * as Config from "config";
import { LandmarkResponseDto } from "src/landmarks/dto/landmark.response.dto";

const size = Config.get<{ filesize: number }>("image").filesize;
@ApiTags("image")
@Controller("image")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

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
    const imageBuffer = file.buffer;
    const landmarkName = await this.imagesService.sendImageToAi(imageBuffer); // server to AI and AI to server
    const landmarkInfo = await this.imagesService.getLandmarkInfo(landmarkName); // server to client
    console.log("landmarkInfo: ", landmarkInfo);
    return landmarkInfo;
  }
}
