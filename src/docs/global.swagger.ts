import { ApiResponseOptions } from "@nestjs/swagger"
import { MessageResponseType } from "./global.swagger.type"

const MessageResponse = (
    description: string,
): ApiResponseOptions => ({
    description,
    status:200,
    type: MessageResponseType,
});


export { MessageResponse }