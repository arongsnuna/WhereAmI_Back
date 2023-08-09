// bookmarks.service.ts
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BookmarksRepository } from "./bookmarks.repository";
import { plainToClass } from "class-transformer";
import { ResponseBookmarkDto, SiDoBookmarkListDto, BookmarklistDto } from "./dto/bookmark.response.dto";
import { MessageResponseDto } from "src/common/dto/message.dto";

@Injectable()
export class BookmarksService {
  constructor(
    private bookmarksRepository: BookmarksRepository, //private configService: ConfigService,
  ) {}

  //북마크 토글 (추가 | 취소)
  async toggleBookmark(userId: string, landmarkId: number): Promise<ResponseBookmarkDto | MessageResponseDto> {
    try {

      // 북마크 취소
      const existingBookmark = await this.bookmarksRepository.findBookmarkById(userId, landmarkId);
      if (existingBookmark) {
        await this.bookmarksRepository.delete(existingBookmark.id);

        return {
          message: `BookmarkId: ${existingBookmark.id} & landmarkId: ${landmarkId} deleted successfully`,
        };
      } else {
        // 북마크가 없으면 추가
        const bookmark = await this.bookmarksRepository.createBookmark(userId, landmarkId);
        return plainToClass(ResponseBookmarkDto, bookmark);
      }
    } 
    catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.")
    }
  }

  //userId로 북마크 리스트 불러오기
  async findBookmarksByUser(userId: string): Promise<SiDoBookmarkListDto[]> {
    try {
      const bookmarks = await this.bookmarksRepository.findManyGroupedByUser(userId);
      if (!bookmarks) {
        throw new NotFoundException("해당 유저에 대한 북마크를 불러올 수 없습니다.");
      }
      return Object.entries(bookmarks).map(([siDo, bookmarksList]) => ({
        siDo,
        bookmarks: bookmarksList.map((bookmark) => plainToClass(ResponseBookmarkDto, bookmark)),
      }));
    }
    catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.")
    } 
  }

  //bookmarkId로 불러오기
  async findOne(id: number): Promise<ResponseBookmarkDto> {
    try {
      const bookmark = await this.bookmarksRepository.findOne(id);
      if (!bookmark) {
        throw new NotFoundException(`해당 북마크(${id})를 불러올 수 없습니다.`);
      }

      return plainToClass(ResponseBookmarkDto, bookmark);
    }
    catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.")
    }
  }

  //실제 사용 X api
  async create(userId: string, landmarkId: number): Promise<ResponseBookmarkDto> {
    try {
      const userExists = await this.bookmarksRepository.findBookmarkByUserId(userId);
      if (!userExists) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      const landmarkExists = await this.bookmarksRepository.findBookmarkByLandmarkId(landmarkId);
      if (!landmarkExists) {
        throw new NotFoundException(`Landmark with id ${landmarkId} not found`);
      }
      const findBookmark = await this.bookmarksRepository.findBookmarkById(userId, landmarkId);

      if (findBookmark) {
        throw new ConflictException(`Bookmark for user ${userId} and landmark ${landmarkId} already exists`);
      }

      const createBookmark = await this.bookmarksRepository.createBookmark(userId, landmarkId);

      return plainToClass(ResponseBookmarkDto, createBookmark);
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.")
    }
  }

  //실제 사용 x api
  async delete(userId: string, landmarkId: number): Promise<null | MessageResponseDto> {
    console.log("id: ", landmarkId);
    const bookmark = await this.bookmarksRepository.findBookmarkById(userId, landmarkId);

    if (!bookmark) {
      throw new NotFoundException(`Bookmark with id ${landmarkId} not found`);
    }

    if (bookmark.userId !== userId) {
      throw new UnauthorizedException(`Not owned by the current user`);
    }
    await this.bookmarksRepository.delete(bookmark.id);

    return { message: `landmarkId: ${landmarkId} deleted successfully` };
  }

  //실제 사용 x api
  async findOneByUserAndLandmark(userId: string, landmarkId: number): Promise<ResponseBookmarkDto> {
    const bookmark = await this.bookmarksRepository.findBookmarkById(userId, landmarkId);
    if (!bookmark) {
      throw new NotFoundException(`Bookmark withlandmark id ${landmarkId} not found`);
    }
    return plainToClass(ResponseBookmarkDto, bookmark);
  }

  //북마크 페이지 - userId로 북마크 불러오기
  async getBookmarksByUserId(userId: string): Promise<BookmarklistDto[]> {
    try {
      if (!userId) throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");

      const bookmarks = await this.bookmarksRepository.findManyByUser(userId);
  
      return bookmarks.map((bookmark) => plainToClass(BookmarklistDto, bookmark));
    }
    catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.")
    }
    
  }
}
