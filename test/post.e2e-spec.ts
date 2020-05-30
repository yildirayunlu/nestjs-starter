import { INestApplication } from '@nestjs/common';
import {
  useSeeding,
  runSeeder,
  useRefreshDatabase,
  tearDownDatabase,
} from 'typeorm-seeding';
import * as request from 'supertest';

import DataSeed from '@/database/seeds/data.seed';
import { createApp } from './utils/App';
import { PostSchema, paginated } from './schema';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async done => {
    app = await createApp();
    await app.init();

    await useSeeding();
    await useRefreshDatabase();

    await runSeeder(DataSeed);
    done();
  });

  afterAll(async () => {
    await tearDownDatabase();
    await app.close();
  });

  describe('[GET] /posts', () => {
    it('should response correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .get('/posts')
        .expect(200);

      expect(body).toMatchSchema(paginated(PostSchema));

      return done();
    });

    it('should limit query response correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .get('/posts?limit=1')
        .expect(200);

      expect(body).toMatchSchema(paginated(PostSchema));
      expect(body.data.length).toBe(1);

      return done();
    });

    it('should page and limit query response correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .get('/posts?limit=1&page=2')
        .expect(200);

      expect(body).toMatchSchema(paginated(PostSchema));
      expect(body.data.length).toBe(1);

      expect(body.data[0].id).toBe(2);

      return done();
    });
  });
});
