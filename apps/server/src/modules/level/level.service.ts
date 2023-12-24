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
import { GetLevelDto } from './dto/get-level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
    private readonly boardService: BoardService
  ) {}

  async create({ boardId, height, width, ...createLevelDto }: CreateLevelDto) {
    let board = null;
    if (boardId) {
      board = await this.boardService.findOne(boardId);
    } else if (height && width) {
      board = await this.boardService.create({ width, height });
    } else {
      throw new BadRequestException(
        'You must provide either existing boardId, or height and width for new board.'
      );
    }

    const level = this.levelRepository.create(createLevelDto);
    level.board = board;
    level.figures = [];

    return new GetLevelDto(await this.levelRepository.save(level));
  }

  async findAll() {
    const levels = await this.levelRepository.find({
      relations: ['board', 'figures'],
    });

    return levels.map((l) => new GetLevelDto(l));
  }

  async findOne(id: string) {
    const level = await this.levelRepository.findOne({
      where: { id },
      relations: ['board', 'figures'],
    });

    if (!level) {
      throw new NotFoundException(`There is no level with id ${id}`);
    }

    return new GetLevelDto(level);
  }

  async findOneByName(name: string) {
    const level = await this.levelRepository.findOne({
      where: { name },
      relations: ['board', 'figures'],
    });

    if (!level) {
      throw new NotFoundException(`There is no level with name ${name}`);
    }

    return new GetLevelDto(level);
  }

  async update(
    id: string,
    { boardId, height, width, ...updateLevelDto }: UpdateLevelDto
  ) {
    const levelToUpdate = await this.findOne(id);

    let board = null;
    if (boardId) {
      board = await this.boardService.findOne(boardId);
    } else if (height && width) {
      board = await this.boardService.create({ width, height });
    }

    levelToUpdate.board = board ? board : levelToUpdate.board;
    const savedLevel = await this.levelRepository.save({
      ...levelToUpdate,
      ...updateLevelDto,
    });
    board.levels.push(savedLevel);
    await this.boardService.update(board.id, board);

    return new GetLevelDto(await this.levelRepository.save(savedLevel));
  }

  async updateByName(
    name: string,
    { boardId, height, width, ...updateLevelDto }: UpdateLevelDto
  ) {
    const levelToUpdate = await this.findOneByName(name);

    let board = null;
    if (boardId) {
      board = await this.boardService.findOne(boardId);
    } else if (height && width) {
      board = await this.boardService.create({ width, height });
    }

    levelToUpdate.board = board ? board : levelToUpdate.board;
    const savedLevel = await this.levelRepository.save({
      ...levelToUpdate,
      ...updateLevelDto,
    });
    if (board) {
      board.levels.push(savedLevel);
      await this.boardService.update(board.id, board);
    }

    return new GetLevelDto(await this.levelRepository.save(savedLevel));
  }

  async remove(id: string) {
    const level = await this.findOne(id);

    return new GetLevelDto(await this.levelRepository.remove(level));
  }
}
