import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaService } from 'src/prisma.service';
import { Security } from 'src/auth/auth.security';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, Security],
  exports: [UsersRepository],
})
export class UsersModule {}
