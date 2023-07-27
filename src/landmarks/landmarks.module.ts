import { Module } from '@nestjs/common';
import { LandmarkController } from './landmarks.controller';
import { LandmarkService } from './landmarks.service';
import { PrismaService } from 'src/prisma.service';
import { LandmarkRepository } from './landmarks.repository';
import { S3Module } from 'src/common/s3/s3.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [S3Module, ConfigModule],
  controllers: [LandmarkController],
  providers: [LandmarkService, PrismaService, LandmarkRepository],
  exports : [LandmarkService]
})
export class LandmarksModule {}
