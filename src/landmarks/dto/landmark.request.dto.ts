import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetLandmarkDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the landmark',
    example: '63시티'
  })
  readonly name: string;
}
