import { ApiProperty } from "@nestjs/swagger";

class GetScheduleListRequestDto {
    @ApiProperty()
    id: string;
}

export {GetScheduleListRequestDto}