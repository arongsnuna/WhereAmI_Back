import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetLandmarkDto {
  @IsString()
  @ApiProperty({
    description: "랜드마크 장소 이름",
    example: "63시티",
  })
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
