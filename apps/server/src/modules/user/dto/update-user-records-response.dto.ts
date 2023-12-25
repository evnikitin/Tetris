import { UpdateUserRecordsDto } from './update-user-records.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRecordsResponseDto extends UpdateUserRecordsDto {
  @ApiProperty({
    description: 'User id',
    type: String,
    example: '50a4eb42-61dd-46aa-83e5-fa3c8e127718',
    required: true,
  })
  id: string;
}
