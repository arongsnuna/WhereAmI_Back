import { ResponseBookmarkDto } from "src/bookmarks/dto/bookmark.response.dto";

const BookmarkResponse = {
  status: 200,
  description: `
    일정 정보:
    \`id\`: 북마크 아이디
    \`userId\` : 북마크 유저ID"
    \`landmarkId\` : 랜드마크 ID
    \`siDo\` : 자치구
    \`imagePath\` : 이미지 URL
    \`name\` : 장소명
    \`address\` : 주소 
    \`createdAt\` : 북마크 생성시간 
    `,
  type: ResponseBookmarkDto,
};

export { BookmarkResponse };
