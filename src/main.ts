import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import * as compression from 'compression';
import * as express from 'express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api')
  app.use(express.static(join(__dirname, '..', 'public')));
  app.use(compression());
  app.enableCors();
  await app.listen(configService.get('port'));
}

bootstrap();
