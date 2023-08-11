import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Param,
  Delete,
  ParseIntPipe,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { SchedulersService } from "./schedulers.service";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import {
  CreateSchedulesResponseDto,
  GetScheduleListResponseDto,
  GetSchedulesResponseDto,
} from "./dto/schedulers.response.dto";
import { CreateScheduleRequestDto, DeleteScheduleRequestDto } from "./dto/schedulers.request.dto";
import { MessageResponseDto } from "src/common/dto/message.dto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import GetSchedulerResponse from "src/docs/schedulers/schedulers.swagger";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags("schedulers")
@Controller("scheduler")
export class SchedulersController {
  constructor(private readonly schedulersService: SchedulersService) {}

  //일정 생성 & 저장
  @Post()
  @ApiOperation({ summary: "일정 생성" })
  async askGpt(
    @Req() req: any,
    @Body() createScheduleRequestDto: CreateScheduleRequestDto,
  ): Promise<CreateSchedulesResponseDto> {
    createScheduleRequestDto.userId = req.user.id;
    if (!req.user.id) throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");

    try {
      return await this.schedulersService.askGpt(createScheduleRequestDto);
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
    }
  }

  //일정 리스트 불러오기
  @Get()
  @ApiOperation({ summary: "일정 리스트 불러오기" })
  async getScheduleList(@Req() req: any): Promise<GetScheduleListResponseDto[]> {
    const userId = req.user.id;
    if (!userId) throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");

    try {
      const scheduleList = await this.schedulersService.getScheduleList(userId);

      return scheduleList;
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
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

      return schedule;
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
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
    if (!userId || userId === undefined) {
      throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");
    }

    const schedulerId = req.params.schedulerId;
    if (!schedulerId || schedulerId == undefined) {
      throw new BadRequestException("유효하지 않은 요청입니다.");
    }

    //본인 확인
    if (deleteScheduleRequestDto.userId !== userId) {
      throw new ForbiddenException("삭제 권한이 없습니다.");
    }

    try {
      const schedulerId = +deleteScheduleRequestDto.schedulerId;
      if (!schedulerId || schedulerId == undefined) {
        throw new BadRequestException("유효하지 않은 요청입니다.");
      }

      const responseMessage = await this.schedulersService.deleteSchedule(schedulerId);

      return responseMessage;
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
    }
  }
}
