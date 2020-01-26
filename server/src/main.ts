import { NestFactory } from '@nestjs/core';
import { ValidationPipe, NotAcceptableException } from '@nestjs/common';

import { AppModule } from './app.module';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[]) => {
        const errors = [];

        validationErrors.map(item => {
          // errors.push({
          //   property: error.property,
          //   errors: Object.values(error.constraints),
          // });
          errors.push({
            [item.property]: Object.values(item.constraints),
          });
        });
        return new NotAcceptableException({
          code: 406,
          message: 'Validation Failed',
          errors,
        });
      },
    }),
  );
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
