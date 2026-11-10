import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module.js';

import type { AppConfig } from './config/configuration.js';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const { port, apiPrefix, corsOrigins } = configService.get<AppConfig>('app')!;

  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  app.setGlobalPrefix(apiPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('AG Portfolio API')
    .setDescription('REST API for the AG Portfolio public site and admin dashboard')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.enableShutdownHooks();

  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}/${apiPrefix}`, 'Bootstrap');
  Logger.log(`Swagger docs available at: http://localhost:${port}/docs`, 'Bootstrap');
}

void bootstrap();
