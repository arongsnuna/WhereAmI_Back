import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class OptionalAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
    //인증에 실패하더라도 true를 반환하여 요청을 계속 진행
    try {
      return super.canActivate(context);
    } catch (error) {
      return true;
    }
  }

  handleRequest(err, user, info, context) {
    return user;
  }
}
