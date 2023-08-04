import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/common/s3/s3.service';
import { UsersRepository } from './users.repository';
import { myPageResponseDto,myPageBookmarkResponseDto } from './dto/users.response.dto';
import { plainToClass } from 'class-transformer';
import { MessageResponseDto } from '../common/dto/message.dto';

@Injectable()
export class UsersService{
    constructor(
        private readonly userRepo: UsersRepository,
        private readonly s3Service: S3Service,
      ) {}

    // 프로필 정보 불러오기
    async getUserById(id: string): Promise<myPageResponseDto> {
        const user = await this.userRepo.getUserById(id);
        if(!user){
            throw new Error;
        }

        //북마크 리스트
        const bookmarkCounts = await this.userRepo.countBookmarksBySiDo(id);

        const myPageResponse = plainToClass(myPageResponseDto, {
          ...user,
          bookmarkCounts,
      });

        
        return myPageResponse
    }

    // 마이 프로필 업데이트 (프로필 사진(profilePath) | 유저네임(userName) | 자기소개(description) )
    async updateUserInfo(
      id: string,
      profilePath?: string,
      userName?: string,
      description?: string
    ): Promise<myPageResponseDto> {
      const data: { profilePath?: string; userName?: string; description?: string } = {};
    
      if (profilePath) {
        data.profilePath = profilePath;
      }
    
      if (userName) {
        data.userName = userName;
      }
    
      if (description) {
        data.description = description;
      }
    
      const bookmarkCounts = await this.userRepo.countBookmarksBySiDo(id);
      const updatedUser = await this.userRepo.updateUserInfo(id, data.profilePath, data.userName, data.description);
      const updatedResponse = plainToClass(myPageResponseDto, {
        ...updatedUser,
        bookmarkCounts
      });

      return updatedResponse
    }


    //계정 삭제
    async deleteUser (id: string): Promise<MessageResponseDto> {
        
      await this.userRepo.deleteUser(id);

      return { message: '계정을 성공적으로 삭제하였습니다.'}
    }
    
    }
