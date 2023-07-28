import { AuthResponseDto } from '../../auth/dto/auth.response.dto';

const AuthResponse = {
  status: 200,
  description: '토큰 정보 제공\n\n - `token`: JWT 토큰',
  type: AuthResponseDto,
};

export { AuthResponse };
