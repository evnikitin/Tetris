import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateFigureDto {
  @ApiProperty({
    description: 'Figure shape in number form, then translated into matrix',
    type: Number,
    example: 45521,
    required: true,
  })
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(65535)
  shape: number;

  @ApiProperty({
    description: 'Level name',
    type: Number,
    example: 10,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  levelName: string;
}
