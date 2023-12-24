import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLevelDto {
  @ApiProperty({
    description: 'Level name',
    type: String,
    example: 'NEW',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Level tick time in milliseconds',
    type: Number,
    example: 1000,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  tick: number;

  @ApiProperty({
    description: 'Level duration in seconds',
    type: Number,
    example: 100,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  time: number;

  @ApiProperty({
    description: 'Level points to pass',
    type: Number,
    example: 500,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  points: number;

  @ApiProperty({
    description: 'Board height',
    type: Number,
    example: 12,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  height: number | undefined;

  @ApiProperty({
    description: 'Board width',
    type: Number,
    example: 8,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsInt()
  width: number | undefined;

  @ApiProperty({
    description: 'Existing board id',
    type: String,
    example: '2ee5329f-5e4d-4379-81fa-178f956776bd',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  boardId: string | undefined;

  // @ApiProperty({
  //   description: 'Time record',
  //   type: Number,
  //   example: 45,
  //   required: false,
  // })
  // @IsOptional()
  // @IsNumber()
  // @IsPositive()
  // timeRecord: number | undefined;
  //
  // @ApiProperty({
  //   description: 'Points record',
  //   type: Number,
  //   example: 150,
  //   required: false,
  // })
  // @IsOptional()
  // @IsNumber()
  // @IsPositive()
  // pointsRecord: number | undefined;
}
