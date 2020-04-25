import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { useSeeding, runSeeder, useRefreshDatabase } from 'typeorm-seeding';
import * as request from 'supertest';

import { TypeOrmConfigService } from './factories/database.factory';
import { AppModule } from '../src/app.module';
import CreatePosts from '../src/database/seeds/create-post.seed';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async done => {
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

    await useSeeding();
    await useRefreshDatabase();

    await runSeeder(CreatePosts);
    done();
  });

  afterAll(async done => {
    await useRefreshDatabase();
    done();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
