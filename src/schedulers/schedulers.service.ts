import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { Configuration, OpenAIApi, CreateChatCompletionRequest } from "openai"; // OpenAI SDK 임포트
import {
  CreateSchedulesResponseDto,
  GetScheduleListResponseDto,
  GetSchedulesResponseDto,
} from "./dto/schedulers.response.dto";
import { SchedulersRepository } from "./schedulers.repository";
import { MessageResponseDto } from "src/common/dto/message.dto";
import { CreateScheduleRequestDto } from "./dto/schedulers.request.dto";
import { LandmarkService } from "src/landmarks/landmarks.service";
import { ChatMessage } from "src/common/schedule/ChatMessage";

@Injectable()
export class SchedulersService {
  private openai: OpenAIApi;

  constructor(
    private readonly schedulersRepository: SchedulersRepository,
    private readonly landmarkService: LandmarkService,
  ) {
    const configuration = new Configuration({
      apiKey: process.env.GPT_SECRETKEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  //일정 생성 & 저장
  async askGpt(createScheduleRequestDto: CreateScheduleRequestDto): Promise<CreateSchedulesResponseDto> {
    const { date, title, userId, place } = createScheduleRequestDto;
    const dateArray = date.split(",").map((d) => new Date(d.trim())); // 시작일과 마지막일
    const placeArray = place.split(",").map((d) => d.trim());
    const imagePathArray = await Promise.all(
      placeArray.map(async (placeName) => {
        const landmark = await this.landmarkService.getLandmarkByName({ name: placeName });
        return landmark.imagePath;
      }),
    );
    if (!imagePathArray || imagePathArray == undefined) {
      throw new NotFoundException("이미지를 찾을 수 없습니다.");
    }
    const inputdata = `[${date}] [${place}]`;

    const chatCompletionRequest: CreateChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      messages: ChatMessage(inputdata),
      temperature: 0.1,
    };
    try {
      const scheduledata = await this.openai.createChatCompletion(chatCompletionRequest);

      // API 응답의 구조 검사
      if (!scheduledata || !scheduledata.data || !scheduledata.data.choices || !scheduledata.data.choices[0]) {
        throw new ServiceUnavailableException("OpenAI API로부터 예상치 못한 응답 구조를 받았습니다.");
      }

      const schedule = JSON.parse(scheduledata.data.choices[0].message.content);

      // schedule(JSON 데이터)의 imagePath 추가
      let index = 0;
      Object.values(schedule).forEach((dateArray: any[]) => {
        dateArray.forEach((item) => {
          item.imagePath = imagePathArray[index];
          index++;
        });
      });

      // 스케쥴 생성
      const scheduleList = await this.schedulersRepository.createSchedule(title, schedule, dateArray, userId);

      return scheduleList;
    } catch (error: any) {
      console.error("Error occurred: ", error);

      // OpenAI와의 통신 오류 처리
      if (error && error.response) {
        switch (error.response.status) {
          case 429:
            throw new ServiceUnavailableException("OpenAI API의 요청 제한을 초과했습니다.");
          case 500:
            throw new ServiceUnavailableException("OpenAI API 서버 내부 오류.");
          default:
            throw new ServiceUnavailableException("OpenAI API와 통신 중 알 수 없는 오류 발생.");
        }
      }

      // 그 외 오류 처리
      throw new ServiceUnavailableException(
        "OpenAI API와 통신 중 오류 발생. 네트워크 문제나 API의 예상치 못한 동작으로 인해 발생했을 수 있습니다.",
      );
    }
  }

  //해당 유저의 일정 리스트 불러오기
  async getScheduleList(id: string): Promise<GetScheduleListResponseDto[]> {
    try {
      const scheduleList = await this.schedulersRepository.getScheduleList(id);

      const resultList: GetScheduleListResponseDto[] = [];
      for (const schedule of scheduleList) {
        const firstSchedule = schedule.schedule[0];
        const firstDate = Object.keys(firstSchedule)[0];
        const imagePath = firstSchedule[firstDate][0].imagePath;
        const title = schedule["title"];
        const schedulerId = schedule["id"];

        // 각 일정의 imagePath와 title을 이용하여 GetScheduleListResponseDto 생성
        const responseDto: GetScheduleListResponseDto = {
          schedulerId,
          imagePath,
          title,
        };

        resultList.push(responseDto);
      }

      return resultList;
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.");
    }
  }

  //특정 일정 불러오기
  async getSchedule(id: number): Promise<GetSchedulesResponseDto> {
    try {
      const schedule = await this.schedulersRepository.getSchedule(id);

      return schedule;
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.");
    }
  }

  //일정 삭제하기
  async deleteSchedule(id: number): Promise<null | MessageResponseDto> {
    try {
      //일정이 존재하는지 확인
      const existingSchedule = await this.schedulersRepository.getSchedulebyId(id);
      if (!existingSchedule) {
        throw new NotFoundException("해당 일정이 존재하지 않습니다.");
      }

      const title = existingSchedule.title;

      await this.schedulersRepository.deleteSchedule(id);

      return { message: `${title} 일정이 성공적으로 삭제되었습니다.` };
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.");
    }
  }
}
