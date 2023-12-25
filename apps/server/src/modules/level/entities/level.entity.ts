import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ILevel } from '../interfaces/level.interface';
import { Board } from '../../board/entities/board.entity';
import { Figure } from '../../figure/entities/figure.entity';

@Entity()
export class Level implements ILevel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column()
  tick: number;

  @Column()
  time: number;

  @Column()
  points: number;

  @Column({ type: 'boolean', default: true })
  isNextFigureShown: boolean;

  @Column({ type: 'boolean', default: true })
  isGridShown: boolean;

  @ManyToOne(() => Board, (board) => board.levels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @OneToMany(() => Figure, (figure) => figure.level)
  figures: Figure[];
}
