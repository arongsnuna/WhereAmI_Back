import { Injectable, UnauthorizedException } from "@nestjs/common";
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
  async validate(payload): Promise<User | null> {
    const { userName } = payload;
    console.log("username: ", userName);
    const user = await this.userRepository.getUserByUserName(userName);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user || null;
  }
}
