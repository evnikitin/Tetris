import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Repository } from 'typeorm';
import { BoardService } from '../board/board.service';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
    private readonly boardService: BoardService
  ) {}

  async create({ boardId, height, width, ...createLevelDto }: CreateLevelDto) {
    if (!boardId && !height && !width) {
      throw new BadRequestException(
        'You must provide either existing boardId, or height and width for new board.'
      );
    }

    let board = null;
    if (boardId) {
      board = await this.boardService.findOne(boardId);
    } else {
      board = this.boardService.create({ width, height });
    }

    const level = this.levelRepository.create(createLevelDto);
    level.board = board;
    level.figures = [];

    return await this.levelRepository.save(level);
  }

  findAll() {
    return this.levelRepository.find();
  }

  findOne(id: string) {
    const level = this.levelRepository.findOne({
      where: { id },
      relations: ['board', 'figures'],
    });

    if (!level) {
      throw new NotFoundException(`There is no level with id ${id}`);
    }

    return level;
  }

  findOneByName(name: string) {
    const level = this.levelRepository.findOne({
      where: { name },
      relations: ['board', 'figures'],
    });

    if (!level) {
      throw new NotFoundException(`There is no level with name ${name}`);
    }

    return level;
  }

  async update(id: string, updateLevelDto: UpdateLevelDto) {
    const level = await this.findOne(id);
    // переписать
    const updatedLevel = { ...level, updateLevelDto };

    return await this.levelRepository.save(updatedLevel);
  }

  async remove(id: string) {
    const level = await this.findOne(id);

    return await this.levelRepository.remove(level);
  }
}
