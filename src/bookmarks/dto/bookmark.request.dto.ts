import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class ToggleBookmarkDto {
  @IsNumber()
  @ApiProperty({
    description: "랜드마크 아이디",
    example: 1,
  })
  landmarkId: number;
}

class CreateBookmarkDto {
  @IsNumber()
  @ApiProperty({
    description: "랜드마크 아이디",
    example: 1,
  })
  landmarkId: number;
}

class FindBookmarkDto {
  @IsString()
  @ApiProperty({
    description: "랜드마크 아이디",
    example: 1,
  })
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}

export { ToggleBookmarkDto, FindBookmarkDto, CreateBookmarkDto };
