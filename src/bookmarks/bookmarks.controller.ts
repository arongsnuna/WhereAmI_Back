// bookmarks.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  Param,
  ParseIntPipe,
  ValidationPipe,
  Get,
  BadRequestException,
} from "@nestjs/common";
import { BookmarksService } from "./bookmarks.service";

import { ToggleBookmarkDto, FindBookmarkDto, CreateBookmarkDto } from "./dto/bookmark.request.dto";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { MessageResponseDto } from "src/common/dto/message.dto";
import { ApiTags } from "@nestjs/swagger";
import { ResponseBookmarkDto, SiDoBookmarkListDto } from "./dto/bookmark.response.dto";

@ApiTags("bookmarks")
@UseGuards(JwtAuthGuard)
@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  //북마크 추가 버튼 (False > True)
  @Post("toggle")
  toggleBookmark(
    @Request() req: any,
    @Body(ValidationPipe) toggleBookmarkDto: ToggleBookmarkDto,
  ): Promise<ResponseBookmarkDto | MessageResponseDto> {
    const userId = req.user.id;
    const landmarkId = toggleBookmarkDto.landmarkId;
    return this.bookmarksService.toggleBookmark(userId, landmarkId);
  }

  //지역구별 리스트
  @Get("user/:userId")
  async findBookmarksByUser(@Param("userId") findBookmarkDto: FindBookmarkDto): Promise<SiDoBookmarkListDto[]> {
    const userId = findBookmarkDto.userId;
    return this.bookmarksService.findBookmarksByUser(userId);
  }

  // 북마크 아이디로 1개 조회
  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number): Promise<ResponseBookmarkDto> {
    console.log("typeof id: ", typeof id);
    return this.bookmarksService.findOne(id);
  }

  //유저의 랜드마크 아이디로 조회
  // @Post()
  // async createBookmark(
  //   @Request() req: any,
  //   @Body(ValidationPipe) createBookmarkDto: CreateBookmarkDto,
  // ): Promise<ResponseBookmarkDto> {
  //   const userId = req.user.id; // 로그인된 사용자의 ID
  //   const landmarkId = createBookmarkDto.landmarkId;
  //   return this.bookmarksService.create(userId, landmarkId);
  // }

  @Delete(":landmarkId")
  async deleteBookmark(
    @Request() req: any,
    @Param("landmarkId", ParseIntPipe) landmarkId: number,
  ): Promise<void | MessageResponseDto> {
    const userId = req.user.id; // 로그인된 사용자의 ID
    const message = this.bookmarksService.delete(userId, landmarkId);
    return message;
  }

  @Get("user/:userId/landmark/:landmarkId")
  async findOneByUserAndLandmark(
    @Param("userId") userId: string,
    @Param("landmarkId", ParseIntPipe) landmarkId: number,
  ): Promise<ResponseBookmarkDto> {
    return this.bookmarksService.findOneByUserAndLandmark(userId, landmarkId);
  }
}
