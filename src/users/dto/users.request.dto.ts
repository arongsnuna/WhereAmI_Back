import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class UsersRequestDto{

    @ApiProperty()
    @IsString()
    id: string;
}

class DeleteUserRequestDto {

    // @ApiProperty()
    // @IsString()
    // id: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    email: string;

    token: string;
      
   
}

export { UsersRequestDto, DeleteUserRequestDto }