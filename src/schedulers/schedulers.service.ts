import { Injectable } from "@nestjs/common";
import { Configuration, OpenAIApi, CreateCompletionRequest, CreateChatCompletionRequest } from "openai"; // OpenAI SDK 임포트
import { GetSchedulesResponseDto } from "./dto/schedulers.response.dto";
import { SchedulersRepository } from './schedulers.repository';

@Injectable()
export class SchedulersService {
  private openai: OpenAIApi;
  private readonly schedulersRepository : SchedulersRepository

  constructor() {
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

  //일정 리스트 불러오기
  async getScheduleList(id: string): Promise<GetSchedulesResponseDto[]>{
    const scheduleList = await this.schedulersRepository.getScheduleList(id);

    return scheduleList;
  }
}
