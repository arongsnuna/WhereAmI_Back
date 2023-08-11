import { myPageResponseDto } from "src/users/dto/users.response.dto"

const GetUserInfoResponse = {
    status: 200,
    description: `
    마이페이지 정보: 
    \`userName\`: 유저네임 
     \`profilePath\`: 프로필 이미지 경로 
     \`description\`: 자기 소개
     \`createdAt\` : 회원가입 날짜
     \`bookmarkCounts \`:  북마크 리스트 {
        "자치구명" : {
            \`imagePath\`: 대표 이미지 경로
            \`count\`: 개수
        }
     }
    `, 
    type: myPageResponseDto

}

export default GetUserInfoResponse
