import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { AppModule } from './../src/app.module';
import { TypeOrmConfigService } from './factories/database.factory';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
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
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
