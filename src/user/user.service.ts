import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/common/s3/s3.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService{
    constructor(
        private readonly userRepo: UserRepository,
        private readonly s3Service: S3Service,
      ) {}
    async getUserById(id: string): Promise< UserEntity | null> {
        const user = await this.userRepo.getUserById(id);
        if(!user){
            return null;
        }
        return new UserEntity(user);
    }
    async updateUserInfo(
        id: string,
        profilePath: string,
        username: string,
        description: string,
      ): Promise<UserEntity> {
        const updatedUser = await this.userRepo.updateUserInfo(
          id,
          profilePath,
          username,
          description,
        );
        return new UserEntity(updatedUser);
      }
    }