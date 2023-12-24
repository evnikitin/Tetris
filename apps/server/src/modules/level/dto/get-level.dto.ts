import { ApiProperty } from '@nestjs/swagger';
import { Level } from '../entities/level.entity';
import { Board } from '../../board/entities/board.entity';
import { Figure } from '../../figure/entities/figure.entity';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetLevelDto {
  constructor({
    id,
    figures,
    points,
    tick,
    time,
    name,
    board,
    isNextFigureShown,
    isGridShown,
  }: Level) {
    this.id = id;
    this.points = points;
    this.tick = tick;
    this.time = time;
    this.name = name;
    this.board = { ...board, levels: undefined };
    this.points = points;
    this.isGridShown = isGridShown;
    this.isNextFigureShown = isNextFigureShown;
    this.figures = figures?.map((f) => ({ ...f, level: undefined }));
  }

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
    required: true,
  })
  height: number | undefined;

  @ApiProperty({
    description: 'Board width',
    type: Number,
    example: 8,
    required: true,
  })
  width: number | undefined;

  @ApiProperty({
    description: 'Existing board id',
    type: Number,
    example: '9cd46425-b3bf-4188-bd86-c511a9af9012',
    required: true,
  })
  board: Board;

  @ApiProperty({
    description: 'Existing board id',
    type: Number,
    example: '9cd46425-b3bf-4188-bd86-c511a9af9012',
    required: true,
  })
  figures: Figure[];

  @ApiProperty({
    description: 'Defines if next figure is shown',
    type: Boolean,
    example: true,
    required: false,
    default: true,
  })
  isNextFigureShown: boolean;

  @ApiProperty({
    description: 'Defines if grid is shown',
    type: Number,
    example: 100,
    required: false,
    default: true,
  })
  isGridShown: boolean;
}
