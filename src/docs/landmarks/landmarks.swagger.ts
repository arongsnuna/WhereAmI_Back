import { LandmarkResponseDto } from "src/landmarks/dto/landmark.response.dto";
const LandmarkResponse = {
  status: 200,
  description: `
    제공 정보: 
     \`name\`: 제목 
     \`address\`: 주소 
     \`imagePath\`: 이미지 Path 
     \`nearByLandmarks\` : 근처 랜드마크 리스트
    `,
  type: LandmarkResponseDto,
};
export default LandmarkResponse;
