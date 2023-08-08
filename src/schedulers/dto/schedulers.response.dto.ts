import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsInt, IsString } from "class-validator";

class GetSchedulesResponseDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    title: string;

    // @ApiProperty()
    // imagePath : string;

    @ApiProperty()
    @Exclude()
    startDate: Date;

    @ApiProperty()
    @Exclude()
    endDate: Date;

    @ApiProperty()
    @Exclude()
    schedule: string[];

    @ApiProperty()
    @Exclude()
    userId: string;
}

export { GetSchedulesResponseDto };