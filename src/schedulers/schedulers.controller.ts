import { Controller, Post, Body } from "@nestjs/common";
import { SchedulersService } from "./schedulers.service";

@Controller("schedule")
export class SchedulersController {
  constructor(private readonly gptService: SchedulersService) {}

  @Post("ask")
  async askGpt(@Body("prompt") prompt: string): Promise<string> {
    return await this.gptService.askGpt(prompt);
  }
}
