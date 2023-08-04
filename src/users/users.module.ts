import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { PrismaService } from "src/prisma.service";
import { Security } from "src/auth/auth.security";
import { S3Service } from "src/common/s3/s3.service";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, Security, S3Service, ConfigService],
  exports: [UsersRepository],
})
export class UsersModule {}
