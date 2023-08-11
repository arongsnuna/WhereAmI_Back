import { IsString } from "class-validator";

class MessageResponseDto {
  @IsString()
  message: string;
}

export { MessageResponseDto };
