import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from './jwt.service';
import { PasswordService } from './password.service';
import { ITokens } from './interfaces/tokens.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async signUp(createUserDto: RegisterUserDto): Promise<ITokens> {
    const isUserExist = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (isUserExist) {
      throw new BadRequestException('User already exists.');
    }
    const { salt, hashedPassword } = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      salt,
    });
    await this.userRepository.save(user);

    return this.jwtService.generateTokens(user);
  }

  async signIn(signInUserDto: LoginUserDto): Promise<ITokens> {
    const user = await this.userService.findUserByIdOrEmail(
      signInUserDto.email,
    );
    if (!user) {
      throw new BadRequestException('Wrong login or password, try again.');
    }

    const isPasswordCorrect = await this.passwordService.compare(
      signInUserDto.password,
      user.password,
      user.salt,
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong login or password, try again.');
    }

    return this.jwtService.generateTokens(user);
  }

  async refreshTokens(refreshToken: string | undefined): Promise<ITokens> {
    if (!refreshToken) {
      throw new InternalServerErrorException();
    }

    const { sub: id } = await this.jwtService.verifyRefreshToken(refreshToken);
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new InternalServerErrorException();
    }

    return this.jwtService.generateTokens(user);
  }
}
