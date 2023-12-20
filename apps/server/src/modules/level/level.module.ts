import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { BoardModule } from '../board/board.module';

@Module({
  imports: [TypeOrmModule.forFeature([Level]), BoardModule],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService, TypeOrmModule],
})
export class LevelModule {}
