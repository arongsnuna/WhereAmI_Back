import { Controller, Get, Param, Patch, Body, UseGuards, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRequestDto } from './dto/users.request.dto';
import { JwtAuthGuard } from 'src/auth/authentication/guards/jwt.guard';
import { myPageResponseDto } from './dto/users.response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import GetUserInfoResponse from 'src/docs/users/users.swagger';
import { MessageResponse } from 'src/docs/global.swagger';
import { MessageResponseDto } from '../common/dto/message.dto'


@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    // 마이페이지 이동
    @Get(':id')
    @ApiResponse(GetUserInfoResponse)
    async getUserById( 
        @Param() usersRequestDto: UsersRequestDto ): Promise<myPageResponseDto>{
        return this.usersService.getUserById(usersRequestDto.id);
    }


    // 마이 프로필 업데이트 (프로필 사진(profilePath) | 유저네임(userName) | 자기소개(description) )
    @Patch(':id')
    @ApiResponse(GetUserInfoResponse)
    async updateUserInfo(
        
        @Req() req: any,
        @Param() usersRequestDto: UsersRequestDto,
        @Body('profilePath') profilePath: string | null,
        @Body('userName') username: string | null,
        @Body('description') description: string | null,
    ): Promise<myPageResponseDto>{

        //본인 확인
        if (usersRequestDto.id !== req.user.id){
            throw new Error('수정할 수 있는 권한 없음.')
        }

        return await this.usersService.updateUserInfo(usersRequestDto.id, profilePath, username, description);
    }

    //계정 삭제
    @Delete(':id')
    @ApiOperation({summary: '계정 삭제'})
    @ApiResponse(MessageResponse('계정을 성공적으로 삭제하였습니다.'))
    async deleteUser(
        @Req() req: any,
        @Param() usersRequestDto: UsersRequestDto,
    ): Promise<MessageResponseDto>{
        
        //본인 확인
        console.log("req.id: ", req.user.id)
        console.log("userRequestDto.id :", usersRequestDto.id)
        if(req.user.id !== usersRequestDto.id){
            throw new Error('수정할 수 있는 권한 없음.')
        }
        

        const result = await this.usersService.deleteUser(req.id);

        return result;
    }


}
