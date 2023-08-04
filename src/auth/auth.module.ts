import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersRepository } from "src/users/users.repository";
import { Security } from "./auth.security";
import { PrismaService } from "src/prisma.service";
import { JwtStrategy } from "./authentication/strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import * as Config from "config";
import { LocalStrategy } from "./authentication/strategies/local.stategy";

const time = (Config.get("jwt") as { expiresIn: number }).expiresIn;
@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => ({
        secret: configService.get<string>("JWT_SECRETKEY"),
        signOptions: { expiresIn: time },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersRepository,
    PrismaService,
    Security,
    JwtStrategy,
    LocalStrategy,
  ],
  exports: [LocalStrategy, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
