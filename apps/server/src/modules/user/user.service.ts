import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { isEmail } from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findUserByIdOrEmail(idOrEmail: string): Promise<User | null> {
    if (isEmail(idOrEmail)) {
      return this.userRepository.findOneBy({ email: idOrEmail });
    }
    return this.userRepository.findOneBy({ id: idOrEmail });
  }
}
