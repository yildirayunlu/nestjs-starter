import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { AppModule } from '../../src/app.module';
import { UserModule } from '../../src/user/user.module';
import { AuthModule } from '../../src/auth/auth.module';
import { TypeOrmConfigService } from '../factories/database.factory';

export const createApp = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env.test',
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useClass: TypeOrmConfigService,
      }),
      AppModule,
      UserModule,
      AuthModule,
    ],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());

  return app;
};
