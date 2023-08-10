import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

class GetScheduleListRequestDto {
  @ApiProperty()
  id: string;
}

class ScheduleRequestDto {
  @ApiProperty()
  schedulerId: number;
}

class CreateScheduleRequestDto {
  @ApiProperty({
    description: "일정 장소들",
    example: "159안국, 국립4.19민주묘지, JTBC, 4.19학생혁명기념탑, 3.1독립선언기념탑, KBS",
  })
  place: string;

  @ApiProperty({
    description: "일정 시작날짜, 마지막날짜",
    example: "2023-08-15, 2023-08-17",
  })
  date: string;

  @ApiProperty({
    description: "일정 제목",
    example: "여행 일정",
  })
  title: string;

  @ApiHideProperty()
  userId: string;
}
class DeleteScheduleRequestDto {
  @ApiProperty({
    description: "스케쥴 Id",
    example: "1",
  })
  schedulerId: number;

  @ApiProperty({
    description: "유저 Id",
    example: "a5308ad9-5199-4958-8ec4-1680d140d50f",
  })
  userId: string;
}

export { GetScheduleListRequestDto, ScheduleRequestDto, CreateScheduleRequestDto, DeleteScheduleRequestDto };
