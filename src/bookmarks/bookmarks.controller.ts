// bookmarks.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
  Get,
  BadRequestException,
  Req,
  InternalServerErrorException,
  UnauthorizedException,
  Param,
  ParseIntPipe,
  Delete,
} from "@nestjs/common";
import { BookmarksService } from "./bookmarks.service";
import { ToggleBookmarkDto } from "./dto/bookmark.request.dto";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { MessageResponseDto } from "src/common/dto/message.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponseBookmarkDto, SiDoBookmarkListDto, BookmarklistDto } from "./dto/bookmark.response.dto";
import { OptionalAuthGuard } from "src/auth/authentication/guards/optionAuth.guard";

@ApiTags("bookmarks")
@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  //북마크 토글
  @Post("toggle")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "북마크 토글" })
  toggleBookmark(
    @Request() req: any,
    @Body(ValidationPipe) toggleBookmarkDto: ToggleBookmarkDto,
  ): Promise<ResponseBookmarkDto | MessageResponseDto> {
    try {
      const userId = req.user.id;
      if (!userId) throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");

      const landmarkId = toggleBookmarkDto.landmarkId;
      if (!landmarkId) throw new BadRequestException("북마크에 추가되지 않는 랜드마크입니다.");

      //토글
      return this.bookmarksService.toggleBookmark(userId, landmarkId);
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
    }
  }

  //북마크 페이지
  @Get()
  @ApiOperation({ summary: "북마크 리스트" })
  @UseGuards(OptionalAuthGuard)
  async getUserBookmarks(@Request() req: any): Promise<BookmarklistDto[]> {
    try {
      const userId = req.user.id;
      if (!userId) throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");

      return this.bookmarksService.getBookmarksByUserId(userId);
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
    }
  }

  //지역구별 리스트
  @Get("/user")
  @ApiOperation({ summary: "북마크 지역구별 리스트" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findBookmarksByUser(@Request() req: any): Promise<SiDoBookmarkListDto[]> {
    try {
      const userId = req.user.id;
      if (!userId) throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");

      return this.bookmarksService.findBookmarksByUser(userId);
    } catch (error) {
      throw new InternalServerErrorException(`서버 오류 발생 : ${error.message}`);
    }
  }

  // 북마크 아이디로 1개 조회
  @Get(":landmarkId")
  @ApiOperation({ summary: "랜드마크Id로 북마크 1개 조회" })
  @UseGuards(JwtAuthGuard)
  get(@Request() req: any, @Param("landmarkId", ParseIntPipe) landmarkId: number): Promise<ResponseBookmarkDto> {
    console.log("typeof landmarkId: ", typeof landmarkId);
    const userId = req.user.id;
    return this.bookmarksService.findOne(userId, landmarkId);
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
