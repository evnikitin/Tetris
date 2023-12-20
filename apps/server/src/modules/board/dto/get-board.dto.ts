import { IBoard } from '../interfaces/board.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Board } from '../entities/board.entity';
import { Level } from '../../level/entities/level.entity';

export class GetBoardDto implements IBoard {
  constructor({ id, height, width, levels }: Board) {
    this.id = id;
    this.height = height;
    this.width = width;
    this.levels = levels;
  }

  @ApiProperty({
    description: 'Board id',
    type: String,
    example: '47e7e0b1-1671-4f56-b873-3894473d421d',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'Board height',
    type: Number,
    example: 10,
    required: true,
  })
  height: number;

  @ApiProperty({
    description: 'Board width',
    type: Number,
    example: 12,
    required: true,
  })
  width: number;

  @ApiProperty({
    description: 'Board levels',
    type: [Level],
    example: [],
    required: true,
  })
  levels: Level[];
}
