import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { ITokens } from './interfaces/tokens.interface';
import { IAccessTokenPayload } from './interfaces/access-token-payload.interface';
import { IRefreshTokenPayload } from './interfaces/refresh-token-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(user: User): Promise<ITokens> {
    const [access, refresh] = await Promise.all([
      this.signAccessToken(user),
      this.signRefreshToken(user),
    ]);
    return { access, refresh };
  }

  verifyAccessToken(token: string): Promise<IAccessTokenPayload> {
    try {
      return this.jwtService.verifyAsync<IAccessTokenPayload>(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      });
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  verifyRefreshToken(token: string): Promise<IRefreshTokenPayload> {
    try {
      return this.jwtService.verifyAsync<IRefreshTokenPayload>(token, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  private signAccessToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_TTL'),
      },
    );
  }

  private signRefreshToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_TTL'),
      },
    );
  }
}
