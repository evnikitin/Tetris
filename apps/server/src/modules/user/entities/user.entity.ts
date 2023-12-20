import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { Role } from '../../../enums';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'bytea' })
  salt: Buffer;

  @Column({ type: 'enum', enum: Role, default: Role.PLAYER })
  role: Role;

  @Column({ default: 0 })
  timeRecord: number;

  @Column({ default: 0 })
  pointsRecord: number;
}
