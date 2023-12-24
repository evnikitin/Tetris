import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateUserRecordsDto {
  @ApiProperty({
    description: 'User points record',
    type: Number,
    example: 800,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  pointsRecord: number | undefined;

  @ApiProperty({
    description: 'User time record',
    type: Number,
    example: 800,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  timeRecord: number | undefined;
}
