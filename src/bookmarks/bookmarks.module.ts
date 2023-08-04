import { Module } from "@nestjs/common";
import { BookmarksController } from "./bookmarks.controller";
import { BookmarksService } from "./bookmarks.service";
import { BookmarksRepository } from "./bookmarks.repository";
import { PrismaService } from "src/prisma.service";
//import { ConfigModule } from "@nestjs/config";

@Module({
  //imports: [ConfigModule],
  controllers: [BookmarksController],
  providers: [BookmarksService, PrismaService, BookmarksRepository],
})
export class BookmarksModule {}
