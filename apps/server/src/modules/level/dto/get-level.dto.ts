import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetLevelDto {
  @ApiProperty({
    description: 'Level id',
    type: String,
    example: '47e7e0b1-1671-4f56-b873-3894473d421d',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'Level name',
    type: String,
    example: 'EASY',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Level tick time in milliseconds',
    type: Number,
    example: 1000,
    required: true,
  })
  tick: number;

  @ApiProperty({
    description: 'Level duration in seconds',
    type: Number,
    example: 100,
    required: true,
  })
  time: number;

  @ApiProperty({
    description: 'Level points to pass',
    type: Number,
    example: 500,
    required: true,
  })
  points: number;

  @ApiProperty({
    description: 'Board height',
    type: Number,
    example: 12,
    required: false,
  })
  height: number | undefined;

  @ApiProperty({
    description: 'Board width',
    type: Number,
    example: 8,
    required: false,
  })
  width: number | undefined;

  @ApiProperty({
    description: 'Existing board id',
    type: Number,
    example: '9cd46425-b3bf-4188-bd86-c511a9af9012',
    required: false,
  })
  boardId: string | undefined;

  @ApiProperty({
    description: 'Time record',
    type: Number,
    example: 45,
    required: false,
  })
  timeRecord: number | undefined;

  @ApiProperty({
    description: 'Points record',
    type: Number,
    example: 150,
    required: false,
  })
  pointsRecord: number | undefined;
}
