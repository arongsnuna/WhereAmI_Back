import { ApiProperty } from "@nestjs/swagger";

class GetScheduleListRequestDto {
    @ApiProperty()
    id: string;
}


class ScheduleRequestDto {
    @ApiProperty()
    schedulerId: number;

    // @ApiProperty()
    // userId: string;
}

class DeleteScheduleRequestDto {
    @ApiProperty()
    schedulerId: number;

    @ApiProperty()
    userId: string;
}

export {GetScheduleListRequestDto, ScheduleRequestDto, DeleteScheduleRequestDto}