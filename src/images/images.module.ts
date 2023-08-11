import { Module } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { ImagesService } from "./images.service";
import { HttpModule } from "@nestjs/axios";
import { LandmarksModule } from "src/landmarks/landmarks.module";

@Module({
  imports: [HttpModule, LandmarksModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
