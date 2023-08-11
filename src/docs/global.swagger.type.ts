import { ApiProperty } from "@nestjs/swagger";

class MessageResponseType {
    @ApiProperty()
    message: string;
}

export { MessageResponseType }