import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthRegister } from '@tetris/contracts';

export class RegisterUserDto implements AuthRegister.IRequest {
  @ApiProperty({
    description: "User's email",
    type: String,
    example: 'john.doe@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: "User's password, at least 7 characters long",
    type: String,
    example: 'qwerty123',
    required: true,
  })
  @IsString()
  @MinLength(7)
  password: string;
}
