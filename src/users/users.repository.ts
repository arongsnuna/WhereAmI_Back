import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma.service';
import { Bookmark, User } from '@prisma/client';
import { UsersRequestDto } from './dto/users.request.dto';
import { RegisterRequestDto } from "src/auth/dto/auth.request.dto";


@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  //아이디 조회
  getUserByUserName = async (userName: string): Promise<User | null> => {
    const result = await this.prisma.user.findUnique({ where: { userName } });
    return result;
  };

  //회원가입 - 새로운 유저 등록
  createUser = async (
    user: Pick<User, "email" | "userName" | "password">,
  ): Promise<User> => {

    return await this.prisma.user.create({
      data: user,
    });
    
  };


  // 마이페이지 - 프로필 정보
  async getUserById (id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
          where:  {
            id
          } 
        });
  }

  //마이페이지 - 북마크 리스트
  async countBookmarksBySiDo(id: string): Promise<{ [siDo: string]: { imagePath: string, count: number } } | null> {
      try {
          const bookmarks = await this.prisma.bookmark.findMany({
              where: {
                  userId: id,
              },
              include: {
                  landmark: {
                      select: {
                          area: {
                              select: {
                                  siDo: true,
                              },
                          },
                          imagePath: true, // Include imagePath here from landmark
                      },
                  },
              },
          });

          // Calculate bookmark counts by siDo
          const siDoCounts: { [siDo: string]: { imagePath: string, count: number } } = {};
          for (const bookmark of bookmarks) {
              const siDo = bookmark.landmark.area.siDo;
              
              if (!siDoCounts[siDo]) {
                  siDoCounts[siDo] = {
                      imagePath: bookmark.landmark.imagePath, // Access imagePath from landmark
                      count: 1,
                  };
              } else {
                  siDoCounts[siDo].count += 1;
              }
          }

          return siDoCounts;

      } catch (error) {
          throw new Error(`Error counting bookmarks: ${error.message}`);
      }
  }


  // 마이 프로필 업데이트 (프로필 사진(profilePath) | 유저네임(userName) | 자기소개(description) )
  async updateUserInfo(
    id: string,
    profilePath?: string, 
    userName?: string, 
    description?: string)
    : Promise<User | null> {
      const data : {profilePath?: string, userName?: string, description?: string} = {}; 
      
      if(profilePath){
        data.profilePath = profilePath;
      }
      if(userName){
        data.userName = userName;
      }
      if(description){
        data.description = description;
      }
      
      return this.prisma.user.update({
        where: { id }, 
        data,
      });
  }



  //계정 삭제
  async deleteUser(id: string) : Promise<void> {
    await this.prisma.$transaction([
      this.prisma.bookmark.deleteMany({ where: { userId: id } }),
      this.prisma.user.deleteMany({ where: { id }}),
    ]);
  }
  }
