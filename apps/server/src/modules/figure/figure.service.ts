import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Figure } from './entities/figure.entity';
import { Repository } from 'typeorm';
import { Level } from '../level/entities/level.entity';
import { GetFigureDto } from './dto/get-figure.dto';

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

    const figure = this.figureRepository.create({ shape });

    figure.level = level;

    await this.figureRepository.save(figure);

    level.figures.push(figure);
    await this.levelRepository.save(level);

    return new GetFigureDto(figure);
  }

  async findAll(): Promise<GetFigureDto[]> {
    const figures = await this.figureRepository.find();

    return figures.map((f) => new GetFigureDto(f));
  }

  async findOne(id: string): Promise<GetFigureDto> {
    const figure = await this.figureRepository.findOne({ where: { id } });

    if (!figure) {
      throw new NotFoundException(`There is no figure with id ${id}`);
    }

    return new GetFigureDto(figure);
  }

  async update(
    id: string,
    updateFigureDto: UpdateFigureDto
  ): Promise<GetFigureDto> {
    const figure = await this.findOne(id);

    const updatedFigure = { ...figure, updateFigureDto };

    return new GetFigureDto(await this.figureRepository.save(updatedFigure));
  }

  async remove(id: string): Promise<GetFigureDto> {
    const figure = await this.findOne(id);

    return new GetFigureDto(await this.figureRepository.remove(figure));
  }
}
