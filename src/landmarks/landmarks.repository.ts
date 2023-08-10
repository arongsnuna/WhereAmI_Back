import { PrismaService } from "src/prisma.service";
import { Landmark } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { GetLandmarkDto } from "./dto/landmark.request.dto";
import { LandmarkEntity } from "src/landmarks/landmark.entity";

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

  async findLandmarkByName(getLandmarkDto: GetLandmarkDto): Promise<Landmark> {
    const landmark = await this.prisma.landmark.findUnique({
      where: { name: getLandmarkDto.name },
    });

    return landmark;
  }

  async getNearByLandmarksByAreaId(name: string, areaId: number): Promise<Landmark[]> {
    // name을 제외한 랜덤한 5개 랜드마크 가져오기, raw SQL을 사용
    const rawLandmarks: LandmarkEntity[] = await this.prisma
      .$queryRaw`SELECT * FROM "Landmark" WHERE area_id = ${areaId} AND landmark_name != ${name} ORDER BY RANDOM() LIMIT 5`;

    const landmarks: Landmark[] = rawLandmarks.map((landmark) => ({
      id: landmark.landmark_id,
      fileName: landmark.file_name,
      name: landmark.landmark_name,
      areaId: landmark.area_id,
      address: landmark.address,
      imagePath: landmark.image_path,
    }));

    return landmarks;
  }

  async updateImagePath(name: string, imagePath: string): Promise<Landmark> {
    return await this.prisma.landmark.update({
      where: { name },
      data: { imagePath },
    });
  }
}
