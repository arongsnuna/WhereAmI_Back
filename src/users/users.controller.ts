import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  Req,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersEntity } from "./users.entity";
import { UsersRequestDto } from "./dto/users.request.dto";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { myPageResponseDto } from "./dto/users.response.dto";
import { ApiFile } from "src/common/decorators/apiFile.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { MessageResponseDto } from "src/common/dto/message.dto";

@UseGuards(JwtAuthGuard)
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 마이페이지 이동
  @Get(":id")
  async getUserById(@Param() usersRequestDto: UsersRequestDto): Promise<myPageResponseDto> {
    return this.usersService.getUserById(usersRequestDto.id);
  }

  // @Get('bookmark/:id')
  // async getUserByIdWithBookmarks(@Param('id') id: string): Promise<UsersEntity | null> {
  //     return this.usersService.getUserByIdWithBookmarks(id);
  // }

  @Patch(":id")
  async updateUserInfo(
    @Req() req: any,
    @Param("id") id: string,
    @Body("profilePath") profilePath: string | null,
    @Body("username") username: string | null,
    @Body("description") description: string | null,
  ): Promise<UsersEntity> {
    return this.usersService.updateUserInfo(id, profilePath, username, description);
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

  //   @Delete("Image")
  //   async deleteFile(@Req() req: any, @Body("profilePath") profilePath: string): Promise<void | MessageResponseDto> {
  //     const userId = req.user.id;
  //     console.log("userId", userId);
  //     return await this.usersService.deleteProfileImage(profilePath);
  //   }
}
