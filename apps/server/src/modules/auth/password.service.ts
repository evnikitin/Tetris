import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { hash, verify } from 'argon2';
import { IPasswordHash } from './interfaces/password-hash.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  async hashPassword(password: string): Promise<IPasswordHash> {
    const salt = randomBytes(
      this.configService.getOrThrow<number>('SALT_SIZE')
    );
    const hashedPassword = await hash(password, { salt });
    return { salt, hashedPassword };
  }

  async compare(
    password: string,
    hashedPassword: string,
    salt: Buffer
  ): Promise<boolean> {
    return verify(hashedPassword, password, { salt });
  }
}
