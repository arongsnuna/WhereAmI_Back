import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthRegisterResponseDto {
  @ApiProperty()
  @IsString()
  message: string;
}
