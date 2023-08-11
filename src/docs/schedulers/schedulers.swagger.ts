import { GetSchedulesResponseDto } from "src/schedulers/dto/schedulers.response.dto";

const GetSchedulerResponse = {
    status:200,
    description: `
    일정 정보:
    \`id\`: 일정 아이디
    \`title\` : 일정 타이틀
    \`startDate\` : 여행 시작하는 날
    \`endDate\` : 여행 끝나는 날
    \`schedule\` : 스케줄 
    `,
    type: GetSchedulesResponseDto
}

export default GetSchedulerResponse