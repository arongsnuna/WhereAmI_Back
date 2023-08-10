import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class ToggleBookmarkDto {
  @IsNumber()
  @ApiProperty({
    description: "랜드마크 Id",
    example: 1,
  })
  landmarkId: number;
}

class CreateBookmarkDto {
  @IsNumber()
  @ApiProperty({
    description: "랜드마크 Id",
    example: 1,
  })
  landmarkId: number;
}

class FindBookmarkDto {
  @IsString()
  @ApiProperty({
    description: "유저 Id",
    example: 1,
  })
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}

export { ToggleBookmarkDto, FindBookmarkDto, CreateBookmarkDto };
