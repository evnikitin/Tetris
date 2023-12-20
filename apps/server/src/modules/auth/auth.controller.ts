import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { REFRESH_TOKEN_KEY } from './auth.constants';
import { AuthResponseDto } from './dto/auth-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogoutResponseDto } from './dto/logout-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: "User's registration" })
  @ApiResponse({
    status: 201,
    type: AuthResponseDto,
    description: 'User has been successfully registered',
  })
  async signUp(
    @Body() createUserDto: RegisterUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponseDto> {
    const { access, refresh } = await this.authService.signUp(createUserDto);
    response.cookie(REFRESH_TOKEN_KEY, refresh, { httpOnly: true });
    return { accessToken: access };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: "User's login" })
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
    description: 'User has been successfully logged in',
  })
  async signIn(
    @Body() signInUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponseDto> {
    const { access, refresh } = await this.authService.signIn(signInUserDto);
    response.cookie(REFRESH_TOKEN_KEY, refresh, { httpOnly: true });
    return { accessToken: access };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login-as-admin')
  @ApiOperation({ summary: "Admin's login" })
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
    description: 'Admin has been successfully logged in',
  })
  async signInAsAdmin(
    @Body() signInUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponseDto> {
    const { access, refresh } = await this.authService.signInAsAdmin(
      signInUserDto
    );
    response.cookie(REFRESH_TOKEN_KEY, refresh, { httpOnly: true });
    return { accessToken: access };
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  @ApiOperation({ summary: "User's tokens refresh" })
  @ApiResponse({
    status: 200,
    type: AuthResponseDto,
    description: 'User has successfully refreshed tokens',
  })
  async refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponseDto> {
    const refreshToken = request.cookies[REFRESH_TOKEN_KEY];
    const { access, refresh } = await this.authService.refreshTokens(
      refreshToken
    );
    response.cookie(REFRESH_TOKEN_KEY, refresh, { httpOnly: true });
    return { accessToken: access };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: "User's logout" })
  @ApiResponse({
    status: 200,
    type: LogoutResponseDto,
    description: 'User signed out successfully',
  })
  async signOut(
    @Res({ passthrough: true }) response: Response
  ): Promise<LogoutResponseDto> {
    response.clearCookie(REFRESH_TOKEN_KEY, { httpOnly: true });
    return { message: 'User signed out successfully' };
  }
}
