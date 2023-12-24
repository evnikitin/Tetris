import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IBoard } from '../interfaces/board.interface';
import { Level } from '../../level/entities/level.entity';

@Entity()
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @OneToMany(() => Level, (level) => level.board, {
    cascade: ['insert', 'update', 'remove'],
  })
  levels: Level[];
}
