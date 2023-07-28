import { ApiProperty } from "@nestjs/swagger"
import { Exclude } from "class-transformer";
import { IsEmail, Length, IsString, Matches } from "class-validator"

//회원가입 요청 DTO
class RegisterRequestDto {
  @ApiProperty({ description: '이메일 입력', example: 'cocoa@naver.com' })
    @IsEmail()
    @Length(5,255, { message: '이메일은 5자 이상 255자 이하로 입력하시기 바랍니다.' })
    email: string;

    @ApiProperty({ description: '비밀번호 입력', example: '11111fffff' })
    @IsString()
    @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,20}$/, { message: '비밀번호는 8자 이상 25자 이하이며 영문과 숫자의 조합이어야 합니다.'})
    @Length(8, 20, { message: '비밀번호는 8자 이상 20자 이하로 입력하시기 바랍니다.' })
    password: string;

    @ApiProperty({ description: '아이디 입력', example: 'cocoa' })
    @IsString()
    @Length(5,255, { message: '아이디는 5자 이상 255자 이하로 입력하시기 바랍니다.' })
    userName: string;

    // @Exclude()
    // profilePath: string;

    // @Exclude()
    // description: string;

    // @Exclude()
    // createdAt: number;
  
    // @Exclude()
    // updatedAt: number;

    // @Exclude()
    //deletedAt: number;
  static userName: any;

  
}

class LoginRequestDto {
  @ApiProperty({ description: '아이디 입력', example: 'cocoa' })
  @IsString()
  @Length(5,255, { message: '아이디는 5자 이상 255자 이하로 입력하시기 바랍니다.' })
  userName: string;
  
  @ApiProperty({ description: '비밀번호 입력', example: '11111fffff' })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,20}$/, { message: '비밀번호는 8자 이상 25자 이하이며 영문과 숫자의 조합이어야 합니다.'})
  @Length(8, 20, { message: '비밀번호는 8자 이상 20자 이하로 입력하시기 바랍니다.' })
  password: string;
}

export { RegisterRequestDto, LoginRequestDto };