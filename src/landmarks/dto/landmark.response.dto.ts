import { IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class LandmarkResponseDto {
  @ApiProperty({
    description: "The name of the landmark",
    example: "DMC래미안e편한세상3단지",
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: "The address of the landmark",
    example: "서울특별시 서대문구 수색로 100",
  })
  @IsString()
  @Expose()
  address: string;

  @ApiProperty({
    description: "The image path of the landmark",
    example: "D:\\7team_back\\data\\img\\DMC래미안e편한세상3단지_001_0.jpg",
  })
  @IsString()
  @Expose()
  imagePath: string;

  @Exclude()
  @IsInt()
  id: number;

  @Exclude()
  @IsString()
  fileName: string;

  @Exclude()
  @IsInt()
  areaId: number;
}
