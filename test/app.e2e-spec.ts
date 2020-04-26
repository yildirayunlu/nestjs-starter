import { INestApplication } from '@nestjs/common';
import {
  useSeeding,
  runSeeder,
  useRefreshDatabase,
  tearDownDatabase,
} from 'typeorm-seeding';
import * as request from 'supertest';

import { createApp } from './utils/App';
import CreatePosts from '../src/database/seeds/create-post.seed';
import { HomeSchema } from './schema';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async done => {
    app = await createApp();
    await app.init();

    await useSeeding();
    await useRefreshDatabase();

    await runSeeder(CreatePosts);
    done();
  });

  afterAll(async done => {
    await tearDownDatabase();
    done();
  });

  it('/ (GET)', async done => {
    const response = await request(app.getHttpServer()).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toMatchSchema(HomeSchema);

    return done();
  });
});
