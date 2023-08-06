import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate } from "class-validator";
import { Expose, Exclude } from "class-transformer";
export class AuthResponseDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
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
  @Exclude()
  profilePath: string;

  @ApiProperty()
  @Exclude()
  description: string;

  @ApiProperty()
  @IsDate()
  @Exclude()
  createdAt: Date;

  @ApiProperty()
  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  @Exclude()
  deletedAt: Date;

  @ApiProperty()
  @Exclude()
  bookmarks: myPageBookmarkResponseDto[];
}

class myPageBookmarkResponseDto {
  @ApiProperty()
  landmarkName: string;

  @ApiProperty()
  counts: number;
}
