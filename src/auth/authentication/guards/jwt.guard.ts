import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // "info" 또는 "err" 인자에 기반하여 예외 발생, user: validate 반환된 객체
    // JWT 전략의 validate 메서드에서 반환된 사용자 객체가 없거나 에러가 있을 경우
    if (err || !user) {
      if (info && info.name === "TokenExpiredError") {
        throw new UnauthorizedException("토큰이 만료되었습니다");
      } else if (info && info.name === "JsonWebTokenError") {
        throw new UnauthorizedException("유효하지 않은 토큰입니다");
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
