import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Figure } from './entities/figure.entity';
import { Repository } from 'typeorm';
import { Level } from '../level/entities/level.entity';
import { GetFigureDto } from './dto/get-figure.dto';
import { Matrix } from '../../types';

@Injectable()
export class FigureService {
  constructor(
    @InjectRepository(Figure)
    private readonly figureRepository: Repository<Figure>,
    @InjectRepository(Level) private readonly levelRepository: Repository<Level>
  ) {}

  async create({ shape, levelName }: CreateFigureDto): Promise<GetFigureDto> {
    const level = await this.levelRepository.findOne({
      where: { name: levelName },
      relations: ['figures'],
    });

    if (!level) {
      throw new NotFoundException(`There is no level with name ${levelName}`);
    }
    const newMatrix = this.numberToMatrix(shape);
    const allMatrices = await this.getAllMatrices();

    if (!this.isUniqueFigure(allMatrices, newMatrix)) {
      throw new BadRequestException('Figure with this shape already exists.');
    }

    const figure = this.figureRepository.create({ shape });

    figure.level = level;

    const savedFigure = await this.figureRepository.save(figure);

    level.figures.push(figure);
    await this.levelRepository.save(level);

    return new GetFigureDto(savedFigure);
  }

  async findAll(): Promise<GetFigureDto[]> {
    const figures = await this.figureRepository.find();

    return figures.map((f) => new GetFigureDto(f));
  }

  async findOne(id: string): Promise<GetFigureDto> {
    const figure = await this.figureRepository.findOne({
      where: { id },
      relations: ['level'],
    });

    if (!figure) {
      throw new NotFoundException(`There is no figure with id ${id}`);
    }

    return new GetFigureDto(figure);
  }

  async update(
    id: string,
    { shape, levelName }: UpdateFigureDto
  ): Promise<GetFigureDto> {
    const figureToUpdate = await this.findOne(id);

    if (!levelName) {
      const updatedFigure = await this.figureRepository.save({
        ...figureToUpdate,
        shape,
      });

      return new GetFigureDto(updatedFigure);
    }

    const level = await this.levelRepository.findOne({
      where: { name: levelName },
      relations: ['figures'],
    });

    if (!level) {
      throw new NotFoundException(`There is no level with name ${levelName}`);
    }

    figureToUpdate.level = level;

    const savedFigure = await this.figureRepository.save({
      ...figureToUpdate,
      shape: shape ? shape : figureToUpdate.shape,
    });

    level.figures.push(figureToUpdate);
    await this.levelRepository.save(level);

    return new GetFigureDto(savedFigure);
  }

  async remove(id: string): Promise<GetFigureDto> {
    const figure = await this.findOne(id);

    return new GetFigureDto(await this.figureRepository.remove(figure));
  }

  private isUniqueFigure(
    existingFigures: Matrix[],
    newFigure: Matrix
  ): boolean {
    const rotations = [
      newFigure,
      this.rotate(newFigure),
      this.rotate(this.rotate(newFigure)),
      this.rotate(this.rotate(this.rotate(newFigure))),
    ];

    for (const figure of rotations.map(this.trimFigure)) {
      if (
        existingFigures
          .map(this.trimFigure)
          .some((existing) => this.isSameFigure(existing, figure))
      ) {
        return false;
      }
    }

    return true;
  }

  private rotate(figure: Matrix): Matrix {
    return figure[0].map((_, i) => figure.map((row) => row[i])).reverse();
  }

  private trimFigure(figure: Matrix): Matrix {
    const rows = figure.filter((row) => row.some((cell) => cell === 1));
    const cols = rows[0]
      .map((_, i) => rows.map((row) => row[i]))
      .filter((col) => col.some((cell) => cell === 1));

    return cols.map((col) => col.reverse());
  }

  private isSameFigure(a: Matrix, b: Matrix): boolean {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      return false;
    }

    for (let i = 0; i < a.length; ++i) {
      for (let j = 0; j < a[0].length; ++j) {
        if (a[i][j] !== b[i][j]) {
          return false;
        }
      }
    }

    return true;
  }

  private numberToMatrix(num: number): Matrix {
    const matrix: number[][] = Array.from({ length: 4 }, () =>
      Array(4).fill(0)
    );
    const binaryString = num.toString(2).padStart(16, '0');
    for (let i = 0; i < 16; i++) {
      const row = Math.floor(i / 4);
      const col = i % 4;
      matrix[row][col] = parseInt(binaryString[i], 10);
    }
    return matrix;
  }

  private matrixToNumber(matrix: Matrix): number {
    let binaryString = '';
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        binaryString += matrix[row][col];
      }
    }
    return parseInt(binaryString, 2);
  }

  private async getAllMatrices(): Promise<Matrix[]> {
    const figures = await this.figureRepository.find();

    return figures.map((f) => this.numberToMatrix(f.shape));
  }
}
