import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SchedulersController } from "./schedulers.controller";
import { SchedulersService } from "./schedulers.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [HttpModule], // HttpModule 임포트
  controllers: [SchedulersController],
  providers: [SchedulersService, ConfigService],
})
export class SchedulersModule {}
