import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  Req,
  Delete,
  Post,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersRequestDto } from "./dto/users.request.dto";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { myPageResponseDto } from "./dto/users.response.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import GetUserInfoResponse from "src/docs/users/users.swagger";
import { MessageResponse } from "src/docs/global.swagger";
import { MessageResponseDto } from "../common/dto/message.dto";
import { User } from "@prisma/client";
import { ApiFile } from "src/common/decorators/apiFile.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { FORBIDDEN_MESSAGE } from "@nestjs/core/guards";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags("user")
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //현재 로그인한 사용자 정보 가져오기
  @Get("/my/current")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "현재 로그인한 사용자 정보 가져오기" })
  async getCurrentUser(@Req() req: any): Promise<User | null> {
    const userId = req.user.id;
    try {
      const currentUserInfo = await this.usersService.getCurrentUser(userId);
      return currentUserInfo;
    } catch (error) {
      // 여기서 오류를 처리하거나, 오류 응답을 반환할 수 있습니다.
      throw new Error(error.message);
    }
  }

  // 마이페이지 이동
  @Get(":id")
  @ApiOperation({ summary: "마이페이지 이동" })
  @ApiResponse(GetUserInfoResponse)
  async getUserById(@Param() usersRequestDto: UsersRequestDto): Promise<myPageResponseDto> {
    try {
      return this.usersService.getUserById(usersRequestDto.id);
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
    }
  }

  // 마이 프로필 업데이트 (유저네임(userName) | 자기소개(description) )
  @Patch(":id")
  @ApiOperation({ summary: "프로필 수정" })
  @ApiResponse(GetUserInfoResponse)
  async updateUserInfo(
    @Req() req: any,
    @Param() usersRequestDto: UsersRequestDto,
    @Body("email") email: string | null,
    @Body("description") description: string | null,
  ): Promise<myPageResponseDto> {
    if (!req.user.id) throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");

    try {
      //본인 확인
      if (usersRequestDto.id !== req.user.id) {
        throw new ForbiddenException("수정할 수 있는 권한 없음.");
      }

      return await this.usersService.updateUserInfo(usersRequestDto.id, email, description);
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
    }
  }

  //프로필 이미지 등록
  @Post("Image")
  @ApiFile()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@Req() req: any, @UploadedFile() file: Express.Multer.File): Promise<myPageResponseDto> {
    const userId = req.user.id;
    if (!userId) throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");

    if (!file || file == undefined) {
      throw new BadRequestException("유효한 이미지가 아닙니다.");
    }
    try {
      const user = await this.usersService.uploadProfileImage(userId, file);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
    }
  }

  //계정 삭제
  @Delete(":id")
  @ApiOperation({ summary: "계정 삭제" })
  @ApiResponse(MessageResponse("계정을 성공적으로 삭제하였습니다."))
  async deleteUser(@Req() req: any, @Param() usersRequestDto: UsersRequestDto): Promise<MessageResponseDto> {
    if (!req.user.id) throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");

    try {
      //본인 확인
      if (req.user.id !== usersRequestDto.id) {
        throw new ForbiddenException("삭제할 수 있는 권한 없음.");
      }

      const result = await this.usersService.deleteUser(req.user.id);

      return result;
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
    }
  }
}
