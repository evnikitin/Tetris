import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from '../../shared/decorators';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth()
  @Post()
  create(@Body() createProductDto: CreateProductDto): string {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(): { products: string } {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.productService.findOne(+id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ): string {
    return this.productService.update(+id, updateProductDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.productService.remove(+id);
  }
}
