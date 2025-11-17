import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { formatValidationErrors } from './utils/validation-error.formatter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);
  // const port = configService.get('PORT');

  app.enableCors({
    origin: 'http://localhost:3000', // Chỉ cho phép frontend này
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Nếu dùng cookie/session
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    transformOptions: { enableImplicitConversion: true },
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
        return new BadRequestException({
          message: 'Dữ liệu không hợp lệ',
          errors: formatValidationErrors(errors),
        });
      },
  }));


  app.setGlobalPrefix('api/v1', { exclude: [''] });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
