import { Injectable } from "@nestjs/common";
import { S3Service } from "src/common/s3/s3.service";
import { UsersRepository } from "./users.repository";
import { UsersEntity } from "./users.entity";
import { UsersRequestDto } from "./dto/users.request.dto";
import { myPageResponseDto, myPageBookmarkResponseDto } from "./dto/users.response.dto";
import { plainToClass } from "class-transformer";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly s3Service: S3Service,
  ) {}

  // 프로필 정보 불러오기
  async getUserById(id: string): Promise<myPageResponseDto> {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      throw new Error();
    }

    //북마크 리스트
    const bookmarkCounts = await this.userRepo.countBookmarksBySiDo(id);

    const myPageResponse = plainToClass(myPageResponseDto, {
      ...user,
      bookmarkCounts,
    });

    return myPageResponse;
  }

  async updateUserInfo(id: string, profilePath: string, userName: string, description: string): Promise<UsersEntity> {
    const updatedUser = await this.userRepo.updateUserInfo(id, profilePath, userName, description);
    return new UsersEntity(updatedUser);
  }

  async uploadProfileImage(userId: string, file: Express.Multer.File): Promise<myPageResponseDto> {
    // 파일 유효성 검사
    if (!this.s3Service.validateImageFile(file.originalname)) {
      throw new Error("Invalid file type");
    }

    // 파일명 중복 처리
    const fileNameKey = this.s3Service.generateUniqueFileName(file.originalname);
    const fileName = file.originalname;

    const fileBuffer = file.buffer;
    const ProfilePath = await this.s3Service.uploadFile(fileBuffer, fileNameKey, "User");
    const user = this.userRepo.updateImagePathById(userId, ProfilePath);

    return plainToClass(myPageResponseDto, user);
  }

  async deleteProfileImage(profilePath: string) {
    await this.s3Service.deleteFileByUrl(profilePath);
    return { message: `profileImage deleted successfully` };
  }
}
