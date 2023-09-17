import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('NAME', 'Auth'))
    .setDescription(configService.get('DESCRIPTION', 'App with auth module'))
    .setVersion(configService.get('VERSION', '1.0.0'))
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const url =
    'http://' + configService.get('URL') + ':' + configService.get('PORT');
  const apiDocsPath = configService.get('API_DOCS_PATH', 'api');

  SwaggerModule.setup(apiDocsPath, app, document);

  Logger.log(url + '/' + apiDocsPath, 'Documentation');
}
