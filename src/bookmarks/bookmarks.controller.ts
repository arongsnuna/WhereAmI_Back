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
  Req,
} from "@nestjs/common";
import { BookmarksService } from "./bookmarks.service";

import { ToggleBookmarkDto, FindBookmarkDto, CreateBookmarkDto } from "./dto/bookmark.request.dto";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { MessageResponseDto } from "src/common/dto/message.dto";
import { ApiTags } from "@nestjs/swagger";
import { ResponseBookmarkDto, SiDoBookmarkListDto, BookmarklistDto } from "./dto/bookmark.response.dto";
import { OptionalAuthGuard } from "src/auth/authentication/guards/optionAuth.guard";

@ApiTags("bookmarks")
@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(JwtAuthGuard)
  @Post("toggle")
  toggleBookmark(
    @Request() req: any,
    @Body(ValidationPipe) toggleBookmarkDto: ToggleBookmarkDto,
  ): Promise<ResponseBookmarkDto | MessageResponseDto> {
    const userId = req.user.id;
    const landmarkId = toggleBookmarkDto.landmarkId;
    return this.bookmarksService.toggleBookmark(userId, landmarkId);
  }

  // 서버 코드

  // @Get('/bookmarks')
  // @UseGuards(OptionalAuthGuard) // <--- 여기서 OptionalAuthGuard를 사용합니다
  // async getUserBookmarks(@Request() req: any): Promise<BookmarkDto[]> {
  //   const userId = req.user?.id; // 로그인되지 않은 사용자의 경우 user가 undefined일 수 있음
  //   return this.bookmarksService.getBookmarksByUserId(userId);
  // }

  // @Get("/bookmarks")
  // @UseGuards(OptionalAuthGuard)
  // async getUserBookmarks(@Request() req: any): Promise<BookmarklistDto[]> {
  //   console.log("req.user: ", req.user);
  //   const userId = req.user?.id;
  //   return this.bookmarksService.getBookmarksByUserId(userId);
  // }


  // 북마크 아이디로 1개 조회
  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number): Promise<ResponseBookmarkDto> {
    console.log("typeof id: ", typeof id);
    return this.bookmarksService.findOne(id);
  }

  //유저의 랜드마크 아이디로 조회
  @Post()
  @UseGuards(JwtAuthGuard)
  async createBookmark(
    @Request() req: any,
    @Body(ValidationPipe) createBookmarkDto: CreateBookmarkDto,
  ): Promise<ResponseBookmarkDto> {
    const userId = req.user.id; // 로그인된 사용자의 ID
    const landmarkId = createBookmarkDto.landmarkId;
    return this.bookmarksService.create(userId, landmarkId);
  }

  @Delete(":landmarkId")
  @UseGuards(JwtAuthGuard)
  async deleteBookmark(
    @Request() req: any,
    @Param("landmarkId", ParseIntPipe) landmarkId: number,
  ): Promise<void | MessageResponseDto> {
    const userId = req.user.id; // 로그인된 사용자의 ID
    const message = this.bookmarksService.delete(userId, landmarkId);
    return message;
  }

  @Get(":landmarkId")
  async findOneByUserAndLandmark(
    @Req() req:any,
    @Param("landmarkId", ParseIntPipe) landmarkId: number,
  ): Promise<ResponseBookmarkDto> {
    const userId = req.user.id;
    return this.bookmarksService.findOneByUserAndLandmark(userId, landmarkId);
  }

  //지역구별 리스트
  @Get("/user")
  @UseGuards(JwtAuthGuard)
  async findBookmarksByUser(@Request() req: any): Promise<SiDoBookmarkListDto[]> {
    const userId = req.user.id;
    return this.bookmarksService.findBookmarksByUser(userId);
  }
}
