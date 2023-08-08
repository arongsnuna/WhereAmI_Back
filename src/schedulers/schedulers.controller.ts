import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { SchedulersService } from "./schedulers.service";
import { JwtAuthGuard } from "src/auth/authentication/guards/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller("schedule")
export class SchedulersController {
  constructor(private readonly gptService: SchedulersService) {}

  @Post("ask")
  async askGpt(@Body("prompt") prompt: string): Promise<string> {
    return await this.gptService.askGpt(prompt);
  }
}
