/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { AppContext } from './app-context';

import { importLevelData } from './shared/seeds';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  AppContext.setInstance(app);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.use(cookieParser());

  setupSwagger(app);

  const port: number = app.get(ConfigService).get('PORT', 4000);
  app.enableCors({ credentials: true, origin: 'http://localhost:4200' });
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  // importLevelData().then(() => console.log('Seeds is ran'));
}

bootstrap();
