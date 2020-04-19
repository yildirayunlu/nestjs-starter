import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { useSeeding, runSeeder, useRefreshDatabase } from 'typeorm-seeding';

import { AppModule } from './../src/app.module';
import { ConfigModule } from './../src/config/config.module';
import CreatePosts from './../src/database/seeds/create-post.seed';
import { TypeOrmConfigService } from './../src/factories/database.factory';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async done => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule,
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
