import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FigureService } from './figure.service';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetFigureDto } from './dto/get-figure.dto';

@ApiTags('figure')
@Controller('figure')
export class FigureController {
  constructor(private readonly figureService: FigureService) {}

  @Post()
  @ApiOperation({ summary: 'Create figure' })
  @ApiResponse({
    status: 201,
    type: GetFigureDto,
    description: 'Figure has been successfully created',
  })
  create(@Body() createFigureDto: CreateFigureDto): Promise<GetFigureDto> {
    return this.figureService.create(createFigureDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all figures' })
  @ApiResponse({
    status: 200,
    type: [GetFigureDto],
    description: 'Here are all figures',
  })
  findAll(): Promise<GetFigureDto[]> {
    return this.figureService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one figure' })
  @ApiResponse({
    status: 200,
    type: GetFigureDto,
    description: 'Here is one figure',
  })
  findOne(@Param('id') id: string): Promise<GetFigureDto> {
    return this.figureService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update figure' })
  @ApiResponse({
    status: 200,
    type: GetFigureDto,
    description: 'Figure has been successfully updated',
  })
  update(
    @Param('id') id: string,
    @Body() updateFigureDto: UpdateFigureDto
  ): Promise<GetFigureDto> {
    return this.figureService.update(id, updateFigureDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove figure' })
  @ApiResponse({
    status: 200,
    type: GetFigureDto,
    description: 'Figure has been successfully removed',
  })
  remove(@Param('id') id: string): Promise<GetFigureDto> {
    return this.figureService.remove(id);
  }
}
