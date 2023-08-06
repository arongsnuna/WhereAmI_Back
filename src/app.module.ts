import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LandmarksModule } from "./landmarks/landmarks.module";
import { AuthModule } from "./auth/auth.module";
import { ImagesModule } from "./images/images.module";
import { UsersModule } from "./users/users.module";
import { BookmarksModule } from "./bookmarks/bookmarks.module";
import { SchedulersModule } from './schedulers/schedulers.module';

@Module({
  imports: [
    LandmarksModule,
    AuthModule,
    ImagesModule,
    UsersModule,
    BookmarksModule,
    SchedulersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
