import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// 로그인유저(토큰 확인)와 비로그인 유저가 사용하는 Optional Guard
@Injectable()
export class OptionalAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const hasAuthorizationHeader = request.headers["authorization"];
    if (hasAuthorizationHeader) {
      return super.canActivate(context);
    }
    return true;
  }

  handleRequest(err: any, user: any, info: any) {
    // 토큰 검증에 실패한 경우
    if (err || info) {
      throw new UnauthorizedException("Invalid token");
    }

    // 토큰이 유효하면 사용자 정보 반환, 없으면 undefined 반환
    return user || undefined;
  }
}
