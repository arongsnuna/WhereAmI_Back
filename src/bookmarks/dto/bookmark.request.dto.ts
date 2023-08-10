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

export { ToggleBookmarkDto };
