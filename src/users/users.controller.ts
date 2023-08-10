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
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersRequestDto } from "./dto/users.request.dto";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { myPageResponseDto } from "./dto/users.response.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import GetUserInfoResponse from "src/docs/users/users.swagger";
import { MessageResponse } from "src/docs/global.swagger";
import { MessageResponseDto } from "../common/dto/message.dto";
import { User } from "@prisma/client";
import { ApiFile } from "src/common/decorators/apiFile.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@UseGuards(JwtAuthGuard)
@ApiTags("user")
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //현재 로그인한 사용자 정보 가져오기
  @Get("/my/current")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "현재 로그인한 사용자 정보 가져오기" })
  async getCurrentUser(@Req() req: any): Promise<User | null> {
    console.log("req: ", req);
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
    return this.usersService.getUserById(usersRequestDto.id);
  }

  // 마이 프로필 업데이트 (프로필 사진(profilePath) | 유저네임(userName) | 자기소개(description) )
  @Patch(":id")
  @ApiOperation({ summary: "프로필 수정" })
  @ApiResponse(GetUserInfoResponse)
  async updateUserInfo(
    @Req() req: any,
    @Param() usersRequestDto: UsersRequestDto,
    @Body("profilePath") profilePath: string | null,
    @Body("userName") username: string | null,
    @Body("description") description: string | null,
  ): Promise<myPageResponseDto> {
    //본인 확인
    if (usersRequestDto.id !== req.user.id) {
      throw new Error("수정할 수 있는 권한 없음.");
    }

    return await this.usersService.updateUserInfo(usersRequestDto.id, profilePath, username, description);
  }

  //계정 삭제
  @Delete(":id")
  @ApiOperation({ summary: "계정 삭제" })
  @ApiResponse(MessageResponse("계정을 성공적으로 삭제하였습니다."))
  async deleteUser(@Req() req: any, @Param() usersRequestDto: UsersRequestDto): Promise<MessageResponseDto> {
    //본인 확인
    console.log("req.id: ", req.user.id);
    console.log("userRequestDto.id :", usersRequestDto.id);
    if (req.user.id !== usersRequestDto.id) {
      throw new Error("수정할 수 있는 권한 없음.");
    }

    const result = await this.usersService.deleteUser(req.user.id);

    return result;
  }

  @Post("Image")
  @ApiFile()
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@Req() req: any, @UploadedFile() file: Express.Multer.File): Promise<myPageResponseDto> {
    const userId = req.user.id;
    console.log("userId: ", userId);
    if (!file) {
      throw new Error("File is not provided");
    }
    const user = await this.usersService.uploadProfileImage(userId, file);
    return user;
  }
}
