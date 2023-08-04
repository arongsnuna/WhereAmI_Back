import { Module } from "@nestjs/common";
import { BookmarksController } from "./bookmarks.controller";
import { BookmarksService } from "./bookmarks.service";
import { BookmarksRepository } from "./bookmarks.repository";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [BookmarksController],
  providers: [BookmarksService, PrismaService, BookmarksRepository],
})
export class BookmarksModule {}
