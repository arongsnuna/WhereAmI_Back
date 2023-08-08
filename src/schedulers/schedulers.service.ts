import { Injectable } from "@nestjs/common";
import { Configuration, OpenAIApi, CreateChatCompletionRequest, ChatCompletionRequestMessage } from "openai"; // OpenAI SDK 임포트
import { lastValueFrom } from "rxjs";
import { CreateSchedulesResponseDto, GetSchedulesResponseDto } from "./dto/schedulers.response.dto";
import { SchedulersRepository } from "./schedulers.repository";
import { MessageResponseDto } from "src/common/dto/message.dto";
import { CreateScheduleRequestDto } from "./dto/schedulers.request.dto";

enum ChatCompletionRequestMessageRoleEnum {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
}

@Injectable()
export class SchedulersService {
  private openai: OpenAIApi;

  constructor(private readonly schedulersRepository: SchedulersRepository) {
    const configuration = new Configuration({
      apiKey: process.env.GPT_SECRETKEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  //일정 생성 & 저장
  async askGpt(createScheduleRequestDto: CreateScheduleRequestDto): Promise<CreateSchedulesResponseDto> {
    const maxRetries = 2; // 최대 재시도 횟수 (429 에러 발생시)
    const delay = 5000; // 재시도 사이의 대기 시간 (밀리초)
    const date = createScheduleRequestDto.date;
    const place = createScheduleRequestDto.place;
    const title = createScheduleRequestDto.title;
    const userId = createScheduleRequestDto.userId;
    const inputdata = `[${date}] [${place}]`;

    const message: ChatCompletionRequestMessage[] = [
      {
        role: ChatCompletionRequestMessageRoleEnum.SYSTEM,
        content:
          "You are good at making travel schedules. The location is Seoul, Korea, so you have to base your information on it, and Answers must be translated into Korean.",
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.USER,
        content:
          " I will give the input in the format [date] [place]. The 'date' will provide the duration from the first day to the last day. You must plan the travel itinerary appropriately within that period, ensuring it's evenly distributed throughout the duration.",
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.ASSISTANT,
        content: inputdata,
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.USER,
        content: "I need to send it in 'json' format, Please take the form of 'json' including the field",
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.ASSISTANT,
        content:
          "take the form The output json form is as follows: '{{date: {{name: {{time, address, description, recommendPlace, distance, duration, transportation}} }} }}' ",
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.USER,
        content:
          "You must not violate any of the instructions written on the numbers. Please follow all of them and answer them, Let's think step by step. Please reply to the above contents as they are delivered according to the rules. The first distance is the starting position, so it'll be zero, Once again, please give me accurate information on the 'distance' and 'duration' between places!.\n" +
          "1. Let's think step by step. Firstly, the sequence should be arranged in the order of the closest proximity between the given locations. This means choosing the next location based on its proximity to the current one. After determining the sequence, the selected locations are then appropriately allocated to the travel dates to form the itinerary. This process ensures that each location is visited only once and that there are no days without scheduled activities.\n" +
          "2. I will provide the 'names' of the places and the duration. Please plan a travel itinerary based on the proximity of the places. Also, recommend nearby attractions and plan the route accordingly. and The more 'recommendPlace' options, the better. and The time should be presented in a specific format like '9:00 AM'. \n" +
          "3. Explanation is required for each place! Please include in the 'description' if any of the places are closed on certain days. Also, distance information should be based on the actual kilometers to each place. There should also be a 'duration' field in minutes and hours. Please send only the numbers without the units. \n" +
          "4. In the 'transportation' field, please provide a comprehensive guide on how to travel from the previous location to the current one. This should include the specific subway lines, transfer points, bus numbers, and any walking directions if necessary. I'd like a step-by-step instruction." +
          //"4. In the 'transportation' field, I would appreciate if you could provide detailed instructions on how to get from the previous location to the current one. Please explain in detail. \n" +
          "5. While we move in order of proximity, the journey is determined by connecting to the nearest location from the last place visited. Therefore, the distance between places needs to be calculated. Please arrange the schedule efficiently considering the distances between places.\n" +
          "6. I need to send it in 'json' format, Please take the form of 'json' including the field, take the form The output json form is as follows: '{{'date': {{ 'name': , 'time':, 'address':, 'description':, 'recommendPlace':, 'distance':, 'duration':, 'transportation': }} }}' \n" +
          "7. The travel itinerary should be appropriately scheduled over the given duration. Moreover, the sequence should be arranged in the order of the closest proximity between places. As a result, it needs to be calculated based on the 'distance' and 'duration' between the subsequent locations. Once again, please adhere to the numbered instructions above. Calculate the distance and time between the places accurately. \n" +
          "8. You must respond in 'Korean' and You can only answer in the above json format. \n" +
          "9. 위의 1부터 8번호까지 지시 사항들을 모두 꼭 지켜서 만들어줘 '한글로 답변' 해야하고 그리고 출력은 'The output json form is as follows:'에서 명시한 json포맷으로 보내야하기때문에 형태가 달라지면 안돼 \n",
      },
    ];

    const chatCompletionRequest: CreateChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      messages: message,
      temperature: 0.1,
      //max_tokens: 1000,
    };

    for (let i = 0; i < maxRetries; i++) {
      try {
        const scheduledata = await this.openai.createChatCompletion(chatCompletionRequest);
        console.log("completion: ", scheduledata.data.choices[0].message.content); // GPT 출력 결과 메세지
        //const scheduleData = schedule.data.choices[0].message.content.map((msg) => msg.content);
        const schedule = scheduledata.data.choices[0].message.content;

        const scheduleList = await this.schedulersRepository.createSchedule(title, schedule, date, userId);
        return scheduleList;
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
          throw error;
        }
      }
    }

    throw new Error("Failed to create travel plan after retries"); // 재시도 후에도 실패한 경우
  }

  //해당 유저의 일정 리스트 불러오기
  async getScheduleList(id: string): Promise<GetSchedulesResponseDto[]> {
    console.log("id: ", id);
    const scheduleList = await this.schedulersRepository.getScheduleList(id);
    console.log("scheduleList:", scheduleList);
    return scheduleList;
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
