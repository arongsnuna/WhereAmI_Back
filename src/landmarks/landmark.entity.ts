export class LandmarkEntity {
  landmark_name: string;
  address: string;
  image_path: string;
  file_name: string;
  landmark_id: number;
  area_id: number;

  constructor(partial: Partial<LandmarkEntity>) {
    Object.assign(this, partial);
  }
}
