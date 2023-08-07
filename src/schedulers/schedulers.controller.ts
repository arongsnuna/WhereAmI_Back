import { Controller, Post, Body, UseGuards, Get, Req, Param } from "@nestjs/common";
import { SchedulersService } from "./schedulers.service";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { GetSchedulesResponseDto } from "./dto/schedulers.response.dto";
import { GetScheduleListRequestDto } from "./dto/schedulers.request.dto";

@UseGuards(JwtAuthGuard)
@Controller("scheduler")
export class SchedulersController {
  constructor(private readonly schedulersService: SchedulersService) {}

  //일정 생성 & 저장
  @Post("ask")
  async askGpt(@Body("prompt") prompt: string): Promise<string> {
    return await this.schedulersService.askGpt(prompt);
  }

  //일정 리스트 불러오기
  @Get(":id")
  async getScheduleList(
    @Req() req:any,
    @Param() getScheduleListRequestDto: GetScheduleListRequestDto
    ): Promise<GetSchedulesResponseDto[]>{
    const userId = req.user.id;
    console.log(userId);

    if(getScheduleListRequestDto.id !== userId){
      throw new Error('사용 권한이 없습니다.');
    }

    try {
      const scheduleList = await this.schedulersService.getScheduleList(userId);

      return scheduleList;

    }
    catch (error) {
      throw new Error(error.message)
    }
  }
  

}
