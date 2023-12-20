import { IBoard } from '../interfaces/board.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateBoardDto implements IBoard {
  @ApiProperty({
    description: 'Board height',
    type: Number,
    example: 10,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  height: number;

  @ApiProperty({
    description: 'Board width',
    type: Number,
    example: 12,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  width: number;
}
