import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PRIVATE } from '../auth.constants';
import { JwtService } from '../jwt.service';
import { REQUEST_USER_KEY } from '../auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPrivate = this.reflector.getAllAndOverride(IS_PRIVATE, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isPrivate) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Invalid accessToken.');
    }

    try {
      const payload = await this.jwtService.verifyAccessToken(token);
      request[REQUEST_USER_KEY] = payload;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];
    if (bearer !== 'Bearer') return undefined;

    return token;
  }
}
