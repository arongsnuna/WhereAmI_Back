import { Injectable } from "@nestjs/common";
import { Scheduler } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SchedulersRepository {
  constructor(private prisma: PrismaService) {}

  async createSchedule(title: string, schedule: string, date: string, userId: string): Promise<Scheduler> {
    const [start, end] = date.split(",").map((d) => new Date(d.trim())); // 시작일과 마지막일
    const scheduler = this.prisma.scheduler.create({
      data: {
        title,
        startDate: start,
        endDate: end,
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

    console.log(scheduleList);
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
