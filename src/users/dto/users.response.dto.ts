import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDate } from 'class-validator';

//마이페이지 
class myPageResponseDto {

  @ApiProperty()
  @Exclude()
  id: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  @Exclude()
  email: string;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  profilePath: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  @Exclude()
  deletedAt: Date;

  @ApiProperty()
  bookmarks: myPageBookmarkResponseDto[]
}

//마이페이지 - 북마크 리스트
class myPageBookmarkResponseDto{

  @ApiProperty()
  landmarkName: string;

  @ApiProperty()
  counts: number;

}


export  {myPageResponseDto, myPageBookmarkResponseDto};
