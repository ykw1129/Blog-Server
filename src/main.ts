import { ValidationPipe, HttpException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // request携带了不存在的参数时，白名单可以自动剥离
      forbidNonWhitelisted: true,
      // forbidNonWhitelisted和白名单结合使用，request携带不存在的属性时，将会报错
      transform: true,
      // 将负载类型转化为相应的DTO
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new WrapResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Blog Server')
    .setDescription('The Blog Server API description')
    .addTag('API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const json = JSON.stringify(document, null, 2);
  fs.writeFileSync('./public/swagger.json', json, 'utf8');
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
