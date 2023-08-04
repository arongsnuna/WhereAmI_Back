import { PrismaService } from "src/prisma.service";
import { Landmark } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { GetLandmarkDto } from "./dto/landmark.request.dto";
import { LandmarkEntity } from "src/landmarks/landmark.entity";
import { plainToClass } from "class-transformer";

@Injectable()
export class LandmarkRepository {
  constructor(private readonly prisma: PrismaService) {}

  async uploadImage(fileName: string): Promise<Landmark> {
    const landmarkData = await this.prisma.landmark.findFirst({
      where: { fileName: fileName },
    });

    if (!landmarkData) {
      throw new Error("Landmark not found in CSV");
    }

    return landmarkData;
  }

  async findLandmarkByName(getLandmarkDto: GetLandmarkDto): Promise<LandmarkEntity> {
    const landmark = await this.prisma.landmark.findUnique({
      where: { name: getLandmarkDto.name },
    });

    return plainToClass(LandmarkEntity, landmark);
  }

  async getNearByLandmarksByAreaId(areaId: number): Promise<LandmarkEntity[]> {
    const landmarks = await this.prisma.landmark.findMany({
      where: { areaId },
      take: 5,
    });

    return landmarks.map((landmark) => plainToClass(LandmarkEntity, landmark));
  }

  async updateImagePath(name: string, imagePath: string): Promise<LandmarkEntity> {
    return await this.prisma.landmark.update({
      where: { name },
      data: { imagePath },
    });
  }
}
