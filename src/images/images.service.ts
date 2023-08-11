import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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

  //이미지를 ai 모델로 전달
  async sendImageToAi(imageBuffer: Buffer): Promise<any> {
    // 이미지 파일을 읽는 대신 Buffer를 Base64 문자열로 변환
    const imageBase64 = imageBuffer.toString("base64");
    if(!imageBase64) throw new BadRequestException("이미지 데이터가 유효하지 않거나 누락되었습니다.")

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
      if(!result$) throw new BadRequestException("데이터가 ai 서버로 전송하는 데 실패하였습니다.");

      const response = await firstValueFrom(result$);

      return response.data.message;
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.")
    }
  }

  // 랜드마크 모듈의 GET 요청을 호출하고, 결과를 반환
  async getLandmarkInfo(landmarkName: string): Promise<{
    landmark: LandmarkResponseDto;
    nearByLandmarks: LandmarkResponseDto[];
  }> {
    try {
      const getLandmarkDto = new GetLandmarkDto(landmarkName);

      //랜드마크 정보 불러오기
      const landmark: LandmarkResponseDto = await this.landmarkService.getLandmarkByName(getLandmarkDto);
      if(!landmark || landmark == undefined) throw new NotFoundException("이미지와 적합한 랜드마크를 찾을 수 없습니다.");
      
      const nearByLandmarks = await this.landmarkService.getNearByLandmarksByArea(landmark.name, landmark.areaId);
      if(!nearByLandmarks || nearByLandmarks == undefined) throw new NotFoundException("주변 랜드마크를 찾을 수 없습니다.");

      return { landmark, nearByLandmarks };
    }
    catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.")
    }
  }
}
