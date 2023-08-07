import { Injectable } from "@nestjs/common";
import { Configuration, OpenAIApi, CreateChatCompletionRequest } from "openai"; // OpenAI SDK 임포트
import { GetSchedulesResponseDto } from "./dto/schedulers.response.dto";
import { SchedulersRepository } from './schedulers.repository';
import { MessageResponseDto } from "src/common/dto/message.dto";

@Injectable()
export class SchedulersService {
  private openai: OpenAIApi;
 

  constructor(
    private readonly schedulersRepository : SchedulersRepository
  ) {
    const configuration = new Configuration({
      apiKey: process.env.GPT_SECRETKEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  //일정 생성 & 저장
  async askGpt(prompt: string): Promise<string> {
    const maxRetries = 2; // 최대 재시도 횟수 (429 에러 발생시)
    const delay = 5000; // 재시도 사이의 대기 시간 (밀리초)

    const chatCompletionRequest: CreateChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
    };

    for (let i = 0; i < maxRetries; i++) {
      try {
        const completion = await this.openai.createChatCompletion(chatCompletionRequest);
        console.log("completion: ", completion.data.choices[0].message.content);
        return completion.data.choices[0].message.content; // GPT 출력 결과 메세지
      } catch (error: any) {
        // Error 처리
        if (error.response && error.response.status === 429) {
          // 429 오류인 경우 재시도
          if (i < maxRetries - 1) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          } else {
            throw new Error("Failed to create travel plan after retries (429 error)");
          }
        } else {
          throw error; // 다른 오류인 경우 예외 발생
        }
      }
    }

    throw new Error("Failed to create travel plan after retries"); // 재시도 후에도 실패한 경우
  }

  //해당 유저의 일정 리스트 불러오기
  async getScheduleList(id: string): Promise<GetSchedulesResponseDto[]>{
    console.log("id: ", id)
    const scheduleList = await this.schedulersRepository.getScheduleList(id);
    console.log("scheduleList:", scheduleList)
    return scheduleList;
  }

  //특정 일정 불러오기
  async getSchedule(id: number): Promise<GetSchedulesResponseDto>{
    const schedule = await this.schedulersRepository.getSchedule(id);

    return schedule;
  }

  //일정 삭제하기
  async deleteSchedule(id: number): Promise<null | MessageResponseDto> {
    //일정이 존재하는지 확인
    const existingSchedule = await this.schedulersRepository.getSchedulebyId(id);
    if(!existingSchedule){
      throw new Error('해당 일정이 존재하지 않습니다.');
    }
    const title = existingSchedule.title;

    await this.schedulersRepository.deleteSchedule(id);

    return { message: `${title} 일정이 성공적으로 삭제되었습니다.`};
  }
}
