import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env-validation.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeormConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FigureModule } from './modules/figure/figure.module';
import { LevelModule } from './modules/level/level.module';
import { BoardModule } from './modules/board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: envValidationSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(getTypeormConfig()),
    AuthModule,
    UserModule,
    FigureModule,
    LevelModule,
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
