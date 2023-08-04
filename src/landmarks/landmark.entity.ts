import { Exclude } from "class-transformer";

export class LandmarkEntity {
  name: string;
  address: string;
  imagePath: string;
  fileName: string;
  id: number;
  @Exclude()
  areaId: number;

  constructor(partial: Partial<LandmarkEntity>) {
    Object.assign(this, partial);
  }
}
