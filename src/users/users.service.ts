import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { S3Service } from "src/common/s3/s3.service";
import { UsersRepository } from "./users.repository";
import { myPageResponseDto, myPageBookmarkResponseDto } from "./dto/users.response.dto";
import { plainToClass } from "class-transformer";
import { MessageResponseDto } from "../common/dto/message.dto";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly s3Service: S3Service,
  ) {}

  // 프로필 정보 불러오기
  async getUserById(id: string): Promise<myPageResponseDto> {
    try {
      const user = await this.userRepo.getUserById(id);
      if (!user) {
        throw new NotFoundException("해당 유저를 찾을 수 없습니다.");
      }

      //북마크 리스트
      const bookmarkCounts = await this.userRepo.countBookmarksBySiDo(id);
      if (!bookmarkCounts) throw new NotFoundException("북마크를 찾을 수 없습니다.");

      const myPageResponse = plainToClass(myPageResponseDto, {
        ...user,
        bookmarkCounts,
      });

      return myPageResponse;
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.");
    }
  }

  // 마이 프로필 업데이트 (유저네임(userName) | 자기소개(description) )
  async updateUserInfo(id: string, email?: string, description?: string): Promise<myPageResponseDto> {
    const data: { email?: string; description?: string } = {};

    if (email) {
      data.email = email;
    }

    if (description) {
      data.description = description;
    }
    if (!email && !description) throw new BadRequestException("수정할 내용을 다시 한 번 확인해주세요.");

    try {
      const bookmarkCounts = await this.userRepo.countBookmarksBySiDo(id);
      const updatedUser = await this.userRepo.updateUserInfo(id, data.email, data.description);
      const updatedResponse = plainToClass(myPageResponseDto, {
        ...updatedUser,
        bookmarkCounts,
      });

      return updatedResponse;
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.");
    }
  }

  //계정 삭제
  async deleteUser(id: string): Promise<MessageResponseDto> {
    try {
      await this.userRepo.deleteUser(id);

      return { message: "계정을 성공적으로 삭제하였습니다." };
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.");
    }
  }

  //현재 로그인한 사용자 정보 가져오기
  async getCurrentUser(userId: string): Promise<User | null> {
    try {
      const result = await this.userRepo.getCurrentUser(userId);
      return result;
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.");
    }
  }

  async uploadProfileImage(userId: string, file: Express.Multer.File): Promise<myPageResponseDto> {
    // 파일 유효성 검사
    if (!this.s3Service.validateImageFile(file.originalname)) {
      throw new ServiceUnavailableException("s3 서비스에서 오류가 발생하였습니다.");
    }
    try {
      // 파일명 중복 처리
      const fileNameKey = this.s3Service.generateUniqueFileName(file.originalname);
      const fileBuffer = file.buffer;
      const ProfilePath = await this.s3Service.uploadFile(fileBuffer, fileNameKey, "User");
      if (!fileNameKey || ProfilePath) {
        throw new ServiceUnavailableException("s3 서비스에서 오류가 발생하였습니다.");
      }

      const user = this.userRepo.updateImagePathById(userId, ProfilePath);

      return plainToClass(myPageResponseDto, user);
    } catch (error) {
      throw new NotFoundException("헤당 리소스를 찾을 수 없습니다.");
    }
  }
}
