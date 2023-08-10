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
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseBookmarkDto, SiDoBookmarkListDto, BookmarklistDto } from "./dto/bookmark.response.dto";
import { OptionalAuthGuard } from "src/auth/authentication/guards/optionAuth.guard";

@ApiTags("bookmarks")
@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post("toggle")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "북마크 토글" })
  toggleBookmark(
    @Request() req: any,
    @Body(ValidationPipe) toggleBookmarkDto: ToggleBookmarkDto,
  ): Promise<ResponseBookmarkDto | MessageResponseDto> {
    const userId = req.user.id;
    const landmarkId = toggleBookmarkDto.landmarkId;
    return this.bookmarksService.toggleBookmark(userId, landmarkId);
  }

  @Get("/bookmarks")
  @ApiOperation({ summary: "북마크 리스트" })
  @UseGuards(OptionalAuthGuard)
  async getUserBookmarks(@Req() req: any): Promise<BookmarklistDto[]> {
    console.log("req.user: ", req.user);
    const userId = req.user?.id;
    return this.bookmarksService.getBookmarksByUserId(userId);
  }

  //지역구별 리스트
  @Get("/user")
  @ApiOperation({ summary: "북마크 지역구별 리스트" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findBookmarksByUser(@Request() req: any): Promise<SiDoBookmarkListDto[]> {
    const userId = req.user.id;
    return this.bookmarksService.findBookmarksByUser(userId);
  }

  @Get(":landmarkId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOneByUserAndLandmark(
    @Request() req: any,
    @Param("landmarkId", ParseIntPipe) landmarkId: number,
  ): Promise<ResponseBookmarkDto> {
    const userId = req.user.id;
    return this.bookmarksService.findOneByUserAndLandmark(userId, landmarkId);
  }

  //유저의 랜드마크 아이디로 조회
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  async deleteBookmark(
    @Request() req: any,
    @Param("landmarkId", ParseIntPipe) landmarkId: number,
  ): Promise<void | MessageResponseDto> {
    const userId = req.user.id; // 로그인된 사용자의 ID
    const message = this.bookmarksService.delete(userId, landmarkId);
    return message;
  }
}
