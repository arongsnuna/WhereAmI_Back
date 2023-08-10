import { Injectable } from "@nestjs/common";
import { Bookmark } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { ResponseBookmarkDto } from "./dto/bookmark.response.dto";

type QueriedBookmark = {
  id: number;
  userId: string;
  landmark: {
    id: number;
    area: {
      siDo: string;
    };
    imagePath: string;
    name: string;
    address: string;
  };
  createdAt: Date;
};
@Injectable()
export class BookmarksRepository {
  constructor(private prisma: PrismaService) {}

  private toResponseBookmarkDto(bookmark: QueriedBookmark): ResponseBookmarkDto {
    return {
      id: bookmark.id,
      userId: bookmark.userId,
      landmarkId: bookmark.landmark.id,
      siDo: bookmark.landmark.area.siDo,
      imagePath: bookmark.landmark.imagePath,
      name: bookmark.landmark.name,
      address: bookmark.landmark.address,
      createdAt: bookmark.createdAt,
    };
  }
  
  //존재하는지 확인
  async findBookmarkById(userId:string, landmarkId: number): Promise<Bookmark | null> {
    const bookmarkExists = await this.prisma.bookmark.findFirst({
      where: {
        userId: userId,
        landmarkId: landmarkId,
      },
    });

    return bookmarkExists;
  }

  //북마크 추가
  async createBookmark(userId: string, landmarkId: number): Promise<ResponseBookmarkDto> {
    const createdBookmark = await this.prisma.bookmark.create({
      data: {
        user: {
          connect: { id: userId },
        },
        landmark: {
          connect: { id: landmarkId },
        },
      },
      include: {
        landmark: {
          include: {
            area: true,
          },
        },
      },
    });

    return this.toResponseBookmarkDto(createdBookmark);
  }

  //북마크 취소
  async delete(id: number): Promise<void> {
    await this.prisma.bookmark.delete({
      where: { id },
    });
  }

  //북마크 리스트 불러오기
  async findManyGroupedByUser(userId: string): Promise<Record<string, ResponseBookmarkDto[]>> {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId: userId },
      include: {
        landmark: {
          select: {
            id: true,
            address: true,
            name: true,
            imagePath: true,
            area: {
              select: {
                siDo: true,
              },
            },
          },
        },
      },
    });

    // 구별로 그룹화
    const groupedBySiDo: Record<string, ResponseBookmarkDto[]> = {};
    for (const bookmark of bookmarks) {
      const siDo = bookmark.landmark.area.siDo;
      if (!groupedBySiDo[siDo]) {
        groupedBySiDo[siDo] = [];
      }
      groupedBySiDo[siDo].push(this.toResponseBookmarkDto(bookmark));
    }

    return groupedBySiDo;
  }

  //북마크id로 불러오기
  async findOne(id: number): Promise<ResponseBookmarkDto> {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: id },
      select: {
        id: true,
        createdAt: true,
        userId: true,
        landmark: {
          select: {
            id: true,
            address: true,
            name: true,
            imagePath: true,
            area: {
              select: {
                siDo: true,
              },
            },
          },
        },
      },
    });

    return this.toResponseBookmarkDto(bookmark);
  }

  //userId로 불러오기
  async findManyByUser(userId: string): Promise<ResponseBookmarkDto[]> {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId: userId },
      include: {
        landmark: {
          select: {
            id: true,
            address: true,
            name: true,
            imagePath: true,
            area: {
              select: {
                siDo: true,
              },
            },
          },
        },
      },
    });
    const groupedBySiDo: ResponseBookmarkDto[] = [];
    for (const bookmark of bookmarks) {
      groupedBySiDo.push(this.toResponseBookmarkDto(bookmark));
    }
    return groupedBySiDo;
  }
}
