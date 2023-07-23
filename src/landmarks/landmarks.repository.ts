import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { Landmark } from "@prisma/client";

@Injectable()
export class LandmarksRepository {
    constructor(private prisma: PrismaService) {}

    async getLandmark(name: string): Promise<Landmark> {
        return this.prisma.landmark.findUnique({ where: { name: name } });
    }
}
