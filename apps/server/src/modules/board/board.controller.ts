import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './entities/board.entity';
import { GetBoardDto } from './dto/get-board.dto';

@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({ summary: 'Create board' })
  @ApiResponse({
    status: 201,
    type: GetBoardDto,
    description: 'Board has been successfully created',
  })
  create(@Body() createBoardDto: CreateBoardDto): Promise<GetBoardDto> {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({
    status: 200,
    type: [GetBoardDto],
    description: 'Here are all boards',
  })
  findAll(): Promise<GetBoardDto[]> {
    return this.boardService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one board' })
  @ApiResponse({
    status: 200,
    type: GetBoardDto,
    description: 'Here is one board',
  })
  findOne(@Param('id') id: string): Promise<GetBoardDto> {
    return this.boardService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update board' })
  @ApiResponse({
    status: 200,
    type: GetBoardDto,
    description: 'Board has been successfully updated',
  })
  update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto
  ): Promise<GetBoardDto> {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove board' })
  @ApiResponse({
    status: 200,
    type: GetBoardDto,
    description: 'Board has been successfully removed',
  })
  remove(@Param('id') id: string): Promise<GetBoardDto> {
    return this.boardService.remove(id);
  }
}
