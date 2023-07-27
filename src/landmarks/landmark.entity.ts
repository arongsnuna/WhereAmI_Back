import { Exclude } from 'class-transformer';

export class LandmarkEntity {
  name: string;
  address: string;
  imagePath: string;
  fileName: string;
  @Exclude()
  id: number;
  @Exclude()
  areaId: number;

  constructor(partial: Partial<LandmarkEntity>) {
    Object.assign(this, partial);
  }
}