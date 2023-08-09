import { ApiProperty } from "@nestjs/swagger";
import { JsonValue } from "@prisma/client/runtime/library";
import { Exclude } from "class-transformer";
import { IsInt, IsString } from "class-validator";

class GetSchedulesResponseDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @Exclude()
  startDate: Date;

  @ApiProperty()
  @Exclude()
  endDate: Date;

  @ApiProperty()
  @Exclude()
  schedule: JsonValue[];

  @ApiProperty()
  @Exclude()
  userId: string;
}

class GetScheduleListResponseDto {
  @ApiProperty()
  @IsInt()
  schedulerId: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  imagePath: any;
}

class CreateSchedulesResponseDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  schedule: JsonValue[];

  @ApiProperty()
  @Exclude()
  startDate: Date;

  @ApiProperty()
  @Exclude()
  endDate: Date;

  @ApiProperty()
  @Exclude()
  userId: string;
}

export { GetSchedulesResponseDto, CreateSchedulesResponseDto, GetScheduleListResponseDto };
