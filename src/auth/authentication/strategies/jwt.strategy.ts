import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";
import { UsersRepository } from "src/users/users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      // 토큰이 유효한지 체크
      secretOrKey: configService.get<string>("JWT_SECRETKEY"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  // payload에 있는 유저이름이 데이터베이스에 있는지 확인
  async validate(payload): Promise<User> {
    try {
    const { userName } = payload;
    const user = await this.userRepository.getUserByUserName(userName);
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
