import { Injectable, NotFoundException } from "@nestjs/common";
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

  async findBookmarkByUserId(userId: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return userExists;
  }

  async findBookmarkByLandmarkId(landmarkId: number) {
    const landmarkExists = await this.prisma.landmark.findUnique({
      where: { id: landmarkId },
    });

    if (!landmarkExists) {
      throw new NotFoundException(`Landmark with id ${landmarkId} not found`);
    }
    return landmarkExists;
  }

  async findBookmarkById(userId:string, landmarkId: number): Promise<Bookmark | null> {
    console.log(`landmarkId: ${landmarkId}`);
    const bookmarkExists = await this.prisma.bookmark.findFirst({
      where: {
        userId: userId,
        landmarkId: landmarkId,
      },
    });

    return bookmarkExists;
  }

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

  async delete(id: number): Promise<void> {
    await this.prisma.bookmark.delete({
      where: { id },
    });
  }
  // async deleteByLandmarkId(userId: string, landmarkId: number): Promise<void> {
  //   const bookmark = await this.prisma.bookmark.findFirst({
  //     where: {
  //       userId,
  //       landmarkId,
  //     },
  //   });

  //   if (bookmark) {
  //     await this.prisma.bookmark.delete({
  //       where: { id: bookmark.id },
  //     });
  //   }
  // }

  // async findAll(): Promise<Bookmark[]> {
  //   return this.prisma.bookmark.findMany({
  //     where: { id },
  //     include: {
  //       landmark: {
  //         include: {
  //           area: true,
  //           id: true,
  //         },
  //         select: {
  //           address: true,
  //           name: true,
  //           imagePath: true,
  //         },
  //       },
  //     },
  //   });
  // }
}
