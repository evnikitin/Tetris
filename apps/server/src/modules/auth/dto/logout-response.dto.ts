import { ApiProperty } from '@nestjs/swagger';
import { AuthLogout } from '@tetris/contracts';

export class LogoutResponseDto implements AuthLogout.IResponse {
  @ApiProperty({
    description: 'Success message',
    type: String,
    example: 'User logged out successfully',
    required: true,
  })
  message: string;
}
