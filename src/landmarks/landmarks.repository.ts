import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { Landmark } from "@prisma/client";

@Injectable()
export class LandmarksRepository {
    constructor(private prisma: PrismaService) {}

    create = async (
        landmark: Landmark, // 타입 주석으로 Landmark 타입을 명시
    ): Promise<Landmark> => {
        return await this.prisma.landmark.create({
            data: landmark,
        });
    };
}
