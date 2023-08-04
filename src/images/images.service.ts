import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { LandmarkService } from "src/landmarks/landmarks.service";
import { LandmarkResponseDto } from "src/landmarks/dto/landmark.response.dto";
import { GetLandmarkDto } from "src/landmarks/dto/landmark.request.dto";
import * as Config from "config";
@Injectable()
export class ImagesService {
  constructor(
    private httpService: HttpService,
    private landmarkService: LandmarkService,
  ) {}

  async sendImageToAi(imageBuffer: Buffer): Promise<any> {
    // 이미지 파일을 읽는 대신 Buffer를 Base64 문자열로 변환
    const imageBase64 = imageBuffer.toString("base64");

    const host = Config.get<{ host: string }>("AiServer").host;
    const port = Config.get<{ port: number }>("AiServer").port;
    const aiServer = `http://${host}:${port}/api-endpoint`; //http://localhost:5000/api-endpoint

    // AI 서버에 POST 요청
    // 이미지 데이터 Base64 문자열 형태로 보내기
    try {
      const result$ = this.httpService.post(
        // Observable 사용
        aiServer,
        { image: imageBase64 },
      );
      const response = await firstValueFrom(result$);
      return response.data.message;
    } catch (error) {
      console.error(error);
    }
  }

  // 랜드마크 모듈의 GET 요청을 호출하고, 결과를 반환
  async getLandmarkInfo(landmarkName: string): Promise<{
    landmark: LandmarkResponseDto;
    nearByLandmarks: LandmarkResponseDto[];
  }> {
    const getLandmarkDto = new GetLandmarkDto(landmarkName);
    const landmark: LandmarkResponseDto =
      await this.landmarkService.getLandmarkByName(getLandmarkDto);
    const nearByLandmarks = await this.landmarkService.getNearByLandmarksByArea(
      landmark.areaId,
    );
    return { landmark, nearByLandmarks };
  }
}
