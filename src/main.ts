import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
    }),
  );
  await app.listen(3000);
}
bootstrap();
