import { Injectable } from "@nestjs/common";
import { Scheduler } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SchedulersRepository { 
  constructor (private prisma: PrismaService) {}

    //일정 리스트 불러오기
  async getScheduleList (id: string): Promise<Scheduler[] | null> {
    const scheduleList = await this.prisma.scheduler.findMany({
      where: {
        userId: id,
      },
    });

    console.log(scheduleList)
    return scheduleList;

  }
}