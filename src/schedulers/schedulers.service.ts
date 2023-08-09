import { Injectable } from "@nestjs/common";
import { Configuration, OpenAIApi, CreateChatCompletionRequest, ChatCompletionRequestMessage } from "openai"; // OpenAI SDK 임포트
import { lastValueFrom } from "rxjs";
import {
  CreateSchedulesResponseDto,
  GetScheduleListResponseDto,
  GetSchedulesResponseDto,
} from "./dto/schedulers.response.dto";
import { SchedulersRepository } from "./schedulers.repository";
import { MessageResponseDto } from "src/common/dto/message.dto";
import { CreateScheduleRequestDto } from "./dto/schedulers.request.dto";
import { LandmarkRepository } from "src/landmarks/landmarks.repository";
import { GetLandmarkDto } from "src/landmarks/dto/landmark.request.dto";
import { LandmarkService } from "src/landmarks/landmarks.service";
import { ChatMessage } from "src/common/schedule/message";

@Injectable()
export class SchedulersService {
  private openai: OpenAIApi;

  constructor(
    private readonly schedulersRepository: SchedulersRepository,
    private readonly landmarkRepository: LandmarkRepository,
    private readonly landmarkService: LandmarkService,
  ) {
    const configuration = new Configuration({
      apiKey: process.env.GPT_SECRETKEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  //일정 생성 & 저장
  async askGpt(createScheduleRequestDto: CreateScheduleRequestDto): Promise<CreateSchedulesResponseDto> {
    const date = createScheduleRequestDto.date;
    const title = createScheduleRequestDto.title;
    const userId = createScheduleRequestDto.userId;
    const place = createScheduleRequestDto.place;
    const placeArray = place.split(",").map((d) => d.trim());
    const dateArray = date.split(",").map((d) => new Date(d.trim())); // 시작일과 마지막일
    const imagePathArray = await Promise.all(
      // imagePath 가져오기
      placeArray.map(async (placeName) => {
        const getLandmarkDto = new GetLandmarkDto(placeName);
        const landmark = await this.landmarkService.getLandmarkByName(getLandmarkDto);
        return landmark.imagePath;
      }),
    );
    const inputdata = `[${date}] [${place}]`;

    const chatCompletionRequest: CreateChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      messages: ChatMessage(inputdata), //message,
      temperature: 0.1,
      //max_tokens: 1000,
    };

    try {
      const scheduledata = await this.openai.createChatCompletion(chatCompletionRequest);
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
      if (error.response.status === 429) {
        // 429 오류
        throw new Error("Failed to create travel plan (429 error)");
      } else {
        throw error;
      }
    }
  }

  //해당 유저의 일정 리스트 불러오기
  async getScheduleList(id: string): Promise<GetScheduleListResponseDto[]> {
    const scheduleList = await this.schedulersRepository.getScheduleList(id);

    const resultList: GetScheduleListResponseDto[] = [];

    for (const schedule of scheduleList) {
      const imagePath = schedule[0]["imagePath"];
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
  }

  //특정 일정 불러오기
  async getSchedule(id: number): Promise<GetSchedulesResponseDto> {
    const schedule = await this.schedulersRepository.getSchedule(id);

    return schedule;
  }

  //일정 삭제하기
  async deleteSchedule(id: number): Promise<null | MessageResponseDto> {
    //일정이 존재하는지 확인
    const existingSchedule = await this.schedulersRepository.getSchedulebyId(id);
    if (!existingSchedule) {
      throw new Error("해당 일정이 존재하지 않습니다.");
    }
    const title = existingSchedule.title;

    await this.schedulersRepository.deleteSchedule(id);

    return { message: `${title} 일정이 성공적으로 삭제되었습니다.` };
  }
}
