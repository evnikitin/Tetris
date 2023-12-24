import { ApiProperty } from '@nestjs/swagger';
import { Figure } from '../entities/figure.entity';
import { Level } from '../../level/entities/level.entity';

export class GetFigureDto {
  constructor({ id, shape, level }: Figure) {
    this.id = id;
    this.shape = shape;
    this.level = { ...level, figures: undefined };
  }

  @ApiProperty({
    description: 'Figure id',
    type: String,
    example: '47e7e0b1-1671-4f56-b873-3894473d421d',
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'Figure shape in number form, then translated into matrix',
    type: Number,
    example: 45521,
    required: true,
  })
  shape: number;

  @ApiProperty({
    description: 'Figure level',
    type: Level,
    example: {
      id: '96a0d8de-e463-47e7-9720-08e1972a97f1',
      name: 'EASY',
      tick: 1000,
      time: 300,
      points: 1500,
      board: {
        id: '01f60761-32ea-4bfa-9912-eb5a49547d88',
        width: 10,
        height: 18,
        levels: [],
      },
    },
    required: true,
  })
  level: Level;
}
