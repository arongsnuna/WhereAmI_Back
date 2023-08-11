import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SchedulersController } from "./schedulers.controller";
import { SchedulersService } from "./schedulers.service";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma.service";
import { SchedulersRepository } from "./schedulers.repository";
import { LandmarksModule } from "src/landmarks/landmarks.module";

@Module({
  imports: [HttpModule, LandmarksModule], // HttpModule 임포트
  controllers: [SchedulersController],
  providers: [SchedulersService, PrismaService, ConfigService, SchedulersRepository],
})
export class SchedulersModule {}
