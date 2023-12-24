import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetBoardDto } from './dto/get-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private readonly boardRepository: Repository<Board>
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const board = this.boardRepository.create(createBoardDto);
    return new GetBoardDto(await this.boardRepository.save(board));
  }

  async findAll() {
    const boards = await this.boardRepository.find({ relations: ['levels'] });

    return boards.map((b) => new GetBoardDto(b));
  }

  async findOne(id: string) {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['levels'],
    });

    if (!board) {
      throw new NotFoundException(`There is no board with id ${id}`);
    }

    return new GetBoardDto(board);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.findOne(id);

    const updatedBoard = { ...board, updateBoardDto };

    return new GetBoardDto(await this.boardRepository.save(updatedBoard));
  }

  async remove(id: string) {
    const board = await this.findOne(id);

    return new GetBoardDto(await this.boardRepository.remove(board));
  }
}
