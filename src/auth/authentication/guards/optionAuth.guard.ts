import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

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

// @Injectable()
// export class OptionalAuthGuard extends AuthGuard("jwt") {
//   canActivate(context: ExecutionContext) {
//     //인증에 실패하더라도 true를 반환하여 요청을 계속 진행
//     try {
//       return super.canActivate(context);
//     } catch (error) {
//       return true;
//     }
//   }

//   handleRequest(err, user, info, context) {
//     return user;
//   }
// }
