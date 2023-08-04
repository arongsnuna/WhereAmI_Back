import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthResponse } from "src/docs/auth/auth.swagger";
import { LoginRequestDto, RegisterRequestDto } from "./dto/auth.request.dto";
import { AuthRegisterResponseDto } from "./dto/auth.RegisterResponse.dto";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./authentication/guards/local.guard";

@ApiTags("Auth - Register")
@Controller("users")
export class AuthController {
  constructor(private authService: AuthService) {}

  //회원가입
  @HttpCode(201) //successfully created : 201
  @ApiOperation({ summary: "Register a new user" })
  @Post("/new")
  async register(
    @Body(ValidationPipe) user: RegisterRequestDto,
  ): Promise<AuthRegisterResponseDto> {
    return this.authService.register(user);
  }

  //로그인
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: "login" })
  @ApiResponse(AuthResponse)
  @Post("login")
  async login(
    @Body(ValidationPipe) loginRequestDto: LoginRequestDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginRequestDto);
  }

  @Post("test")
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log("req", req);
  }
}
