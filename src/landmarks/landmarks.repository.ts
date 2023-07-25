import { PrismaService } from 'src/prisma.service'; 
import { Landmark } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { GetLandmarkDto } from './dto/landmark.request.dto';
import { LandmarkEntity } from 'src/entities/landmark.entity';
import { plainToClass } from 'class-transformer';


@Injectable()
export class LandmarkRepository {

  constructor(private readonly prisma: PrismaService) {}

  async uploadImage(fileName: string): Promise<Landmark> {
    let landmarkData = await this.prisma.landmark.findFirst({where: {fileName : fileName}})

    if (!landmarkData) {
      throw new Error('Landmark not found in CSV');
    }

    return landmarkData;
  }

  async findLandmarkByName(getLandmarkDto: GetLandmarkDto): Promise<LandmarkEntity> {
    const landmark = await this.prisma.landmark.findUnique({ where: getLandmarkDto });
 
    return plainToClass(LandmarkEntity, landmark)
  }

  async getNearByLandmarksByAreaId(areaId: number): Promise<LandmarkEntity[]> {
    const landmarks = await this.prisma.landmark.findMany({ 
      where: { areaId },
      take: 5, 
    });

    return landmarks.map(landmark => plainToClass(LandmarkEntity, landmark));
  }

}
