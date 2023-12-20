import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Level } from './entities/level.entity';

@ApiTags('level')
@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  @ApiOperation({ summary: 'Create level' })
  @ApiResponse({
    status: 201,
    type: Level,
    description: 'Level has been successfully created',
  })
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all levels' })
  @ApiResponse({
    status: 200,
    type: [Level],
    description: 'Here are all levels',
  })
  findAll() {
    return this.levelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one level by id' })
  @ApiResponse({
    status: 200,
    type: Level,
    description: 'Here is one level',
  })
  findOne(@Param('id') id: string) {
    return this.levelService.findOne(id);
  }

  @Get('by-name/:name')
  @ApiOperation({ summary: 'Get one level by name' })
  @ApiResponse({
    status: 200,
    type: Level,
    description: 'Here is one level',
  })
  findOneByName(@Param('name') name: string) {
    return this.levelService.findOneByName(name);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update level' })
  @ApiResponse({
    status: 200,
    type: Level,
    description: 'Level has been successfully updated',
  })
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(id, updateLevelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove level' })
  @ApiResponse({
    status: 200,
    type: Level,
    description: 'Board has been successfully removed',
  })
  remove(@Param('id') id: string) {
    return this.levelService.remove(id);
  }
}
