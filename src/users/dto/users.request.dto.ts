import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class UsersRequestDto{

    @ApiProperty()
    @IsString()
    id: string;
}

export { UsersRequestDto }