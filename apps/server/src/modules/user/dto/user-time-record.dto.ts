import { ApiProperty } from '@nestjs/swagger';

export class UserTimeRecordDto {
  @ApiProperty({
    description: 'User id',
    type: String,
    example: '50a4eb42-61dd-46aa-83e5-fa3c8e127718',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'User time record',
    type: Number,
    example: 800,
    required: true,
  })
  timeRecord: number;

  @ApiProperty({
    description: 'User name',
    type: String,
    example: 'Alex',
    required: true,
  })
  name: string;
}
