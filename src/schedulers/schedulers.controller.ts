import { Controller, Post, Body, UseGuards, Get, Req, Param, Delete, ParseIntPipe } from "@nestjs/common";
import { SchedulersService } from "./schedulers.service";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import {
  CreateSchedulesResponseDto,
  GetScheduleListResponseDto,
  GetSchedulesResponseDto,
} from "./dto/schedulers.response.dto";
import { CreateScheduleRequestDto, DeleteScheduleRequestDto } from "./dto/schedulers.request.dto";
import { MessageResponseDto } from "src/common/dto/message.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import GetSchedulerResponse from "src/docs/schedulers/schedulers.swagger";

@UseGuards(JwtAuthGuard)
@ApiTags("schedulers")
@Controller("scheduler")
export class SchedulersController {
  constructor(private readonly schedulersService: SchedulersService) {}

  //일정 생성 & 저장
  @Post("ask")
  @ApiOperation({ summary: "일정 생성" })
  async askGpt(
    @Req() req: any,
    @Body() createScheduleRequestDto: CreateScheduleRequestDto,
  ): Promise<CreateSchedulesResponseDto> {
    createScheduleRequestDto.userId = req.user.id;
    return await this.schedulersService.askGpt(createScheduleRequestDto);
  }

  //일정 리스트 불러오기
  @Get()
  @ApiOperation({ summary: "일정 리스트 불러오기" })
  async getScheduleList(@Req() req: any): Promise<GetScheduleListResponseDto[]> {
    const userId = req.user.id;

    try {
      const scheduleList = await this.schedulersService.getScheduleList(userId);

      return scheduleList;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //특정 일정 불러오기
  @Get(":schedulerId")
  @ApiOperation({ summary: "특정 일정 불러오기" })
  @ApiResponse(GetSchedulerResponse)
  async getSchedule(
    @Req() req: any,
    @Param("schedulerId", ParseIntPipe) schedulerId: number,
  ): Promise<GetSchedulesResponseDto> {
    try {
      const schedule = await this.schedulersService.getSchedule(schedulerId);
      console.log(schedule);

      return schedule;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //일정 삭제하기
  @Delete(":userId/:schedulerId")
  @ApiOperation({ summary: "특정 일정 삭제하기" })
  @ApiParam({ name: "userId", required: true })
  @ApiParam({ name: "schedulerId", required: true })
  async deleteSchedule(
    @Req() req: any,
    @Param() deleteScheduleRequestDto: DeleteScheduleRequestDto,
  ): Promise<MessageResponseDto> {
    const userId = req.user.id;

    //본인 확인
    if (deleteScheduleRequestDto.userId !== userId) {
      throw new Error("사용 권한이 없습니다.");
    }

    try {
      const schedulerId = +deleteScheduleRequestDto.schedulerId;

      const responseMessage = await this.schedulersService.deleteSchedule(schedulerId);

      return responseMessage;
    } catch (error) {
      throw new Error(error);
    }
  }
}
