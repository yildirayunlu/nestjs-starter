import { NestFactory } from '@nestjs/core';

import { FormValidationPipe } from './pipes/validation.pipe';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new FormValidationPipe());
  await app.listen(3000);
}
bootstrap();
