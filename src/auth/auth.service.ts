import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth.response.dto';
import { LoginRequestDto, RegisterRequestDto } from './dto/auth.request.dto';
import { UsersRepository } from '../users/users.repository';
import { Security } from './auth.security';
import { AuthRegisterResponseDto } from './dto/auth.RegisterResponse.dto';

@Injectable()
export class AuthService {

    constructor(
        private userRepository: UsersRepository,
        private jwtService: JwtService,
        private readonly security: Security
    ) {}

    //회원가입
    register = async (user: RegisterRequestDto) : Promise<AuthRegisterResponseDto> => {
        
        //이미 존재하는 유저인지 확인 [userRepo]
        const existingUser = await this.userRepository.getUserByUserName(user.userName);
        if (existingUser) {
            throw new UnauthorizedException('이미 존재하는 아이디 입니다.');
        }

        try{
            //비밀번호 해시화
            const hashedPassword = await this.security.hashPassword(
                user.password
            );

            //유저 등록
            await this.userRepository.createUser({
                email: user.email,
                password: hashedPassword,
                userName: user.userName,
            });

            return { message: "회원가입에 성공하였습니다."}
        } catch (error) {
            throw new Error(error);
        }
    };

    async login(loginRequestDto: LoginRequestDto): Promise<{accessToken: string}> {
        const user = await this.userRepository.getUserByUserName(loginRequestDto.userName);
        console.log("user",user);
        if(user && (await this.security.comparePassword(loginRequestDto.password, user.password))) {
          // 유저 토큰 생성 ( Secret + Payload )
          const payload = { userName: user.userName };
          const accessToken = await this.jwtService.sign(payload);
          return {accessToken};
        }  else {
            throw new UnauthorizedException('login failed')
        }
    }
    

}
