import { Module } from '@nestjs/common';
import { FigureService } from './figure.service';
import { FigureController } from './figure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Figure } from './entities/figure.entity';
import { LevelModule } from '../level/level.module';

@Module({
  imports: [TypeOrmModule.forFeature([Figure]), LevelModule],
  controllers: [FigureController],
  providers: [FigureService],
  exports: [FigureService, TypeOrmModule],
})
export class FigureModule {}
