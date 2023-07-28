import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { RegisterRequestDto } from "src/auth/dto/auth.request.dto";
import { PrismaService } from "src/prisma.service";


@Injectable()
export class UsersRepository {
    constructor( 
        private prisma: PrismaService
    ) {}

    //아이디 조회
    getUserByUserName = async (userName: string) : Promise<User | null> => {
        const result =  await this.prisma.user.findUnique({ where: { userName }})
        //console.log(result);
        
        return result;
        
    };

    //회원가입 - 새로운 유저 등록
    createUser = async ( user: Pick<User, 'email' | 'userName' | 'password'>,
     ) : Promise<User> => {
        return await this.prisma.user.create({
            data: user,
        });
    }

}