import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { IFigure } from '../interfaces/figure.interface';
import { Level } from '../../level/entities/level.entity';

@Entity()
export class Figure implements IFigure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint' })
  shape: number;

  @ManyToOne(() => Level, (level) => level.figures, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'levelId', foreignKeyConstraintName: '' })
  level: Level;
}
