import { Injectable } from "@nestjs/common";
import { Scheduler } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SchedulersRepository {
  constructor(private prisma: PrismaService) {}

  async createSchedule(title: string, schedule: JsonValue[], date: Date[], userId: string): Promise<Scheduler> {
    const scheduler = this.prisma.scheduler.create({
      data: {
        title,
        startDate: date[0],
        endDate: date[1],
        schedule: [schedule],
        userId,
      },
    });

    return scheduler;
  }

  //일정 리스트 불러오기
  async getScheduleList(id: string): Promise<Scheduler[] | null> {
    const scheduleList = await this.prisma.scheduler.findMany({
      where: {
        userId: id,
      },
    });
    return scheduleList;
  }

  //특정 일정 불러오기
  async getSchedule(id: number): Promise<Scheduler | null> {
    const schedule = await this.prisma.scheduler.findUnique({
      where: {
        id,
      },
    });

    return schedule;
  }

  //일정 삭제하기
  async deleteSchedule(id: number): Promise<void> {
    await this.prisma.scheduler.delete({
      where: {
        id,
      },
    });
  }

  //일정 존재 체크
  async getSchedulebyId(id: number): Promise<Scheduler | null> {
    const schedule = await this.prisma.scheduler.findUnique({
      where: { id },
    });

    return schedule;
  }
}
