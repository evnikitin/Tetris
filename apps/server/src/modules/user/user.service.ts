import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { isEmail } from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPointsRecordDto } from './dto/user-points-record.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  findUserByIdOrEmail(idOrEmail: string): Promise<User | null> {
    if (isEmail(idOrEmail)) {
      return this.userRepository.findOneBy({ email: idOrEmail });
    }
    return this.userRepository.findOneBy({ id: idOrEmail });
  }

  async getTimeRecords() {
    const users = await this.userRepository.find({
      take: 5,
      order: { timeRecord: 'DESC' },
    });

    return users.map((u) => ({
      id: u.id,
      timeRecord: u.timeRecord,
      name: u.name,
    }));
  }

  async getPointsRecords(): Promise<UserPointsRecordDto[]> {
    const users = await this.userRepository.find({
      take: 5,
      order: { pointsRecord: 'DESC' },
    });

    return users.map((u) => ({
      id: u.id,
      pointsRecord: u.pointsRecord,
      name: u.name,
    }));
  }
}
