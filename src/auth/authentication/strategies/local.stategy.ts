import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../../auth.service";
import { LoginRequestDto } from "src/auth/dto/auth.request.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "userName", // 요청의 사용자 이름을 가져올 필드
      passwordField: "password", // 요청에서 비밀번호를 가져올 필드
    });
  }
  async validate(userName: string, password: string): Promise<LoginRequestDto> {
    const loginRequestDto = new LoginRequestDto(userName, password);
    try {
      const user = await this.authService.validateUser(loginRequestDto);
      if (!user) {
        throw new UnauthorizedException("로그인 되지 않은 사용자입니다.");
      }
      return user;
    }
    catch (error) {
      throw new NotFoundException("데이터베이스에 해당 유저 정보가 존재하지 않습니다.");
    }
  }
}
