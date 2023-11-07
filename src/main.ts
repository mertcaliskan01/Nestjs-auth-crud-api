import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './core/filters/http.filter';
import { FallbackExceptionFilter } from './core/filters/fallback.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.setGlobalPrefix('nestapi');
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter()
  );

  const options = new DocumentBuilder()
    .setTitle('Api ')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('Api')
    .build();


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('nestapi/swagger', app, document);

  await app.listen(AppModule.port || 5000);

  console.log(`Application is running on: http://localhost:${AppModule.port || 5000}/swagger/  `);

}
bootstrap();
