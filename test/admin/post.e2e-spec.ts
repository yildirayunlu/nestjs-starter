import { INestApplication } from '@nestjs/common';
import {
  useSeeding,
  runSeeder,
  useRefreshDatabase,
  tearDownDatabase,
} from 'typeorm-seeding';
import * as request from 'supertest';

import DataSeed from '@/database/seeds/data.seed';
import { createApp } from '../utils/App';
import { paginated, AdminPostSchema } from '../schema';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async done => {
    app = await createApp();
    await app.init();

    await useSeeding();
    await useRefreshDatabase();

    await runSeeder(DataSeed);
    done();
  });

  afterAll(async done => {
    await tearDownDatabase();
    done();
  });

  describe('admin/posts (e2e)', () => {
    describe('[GET] admin/posts', () => {
      it('should unauthorized response', async done => {
        await request(app.getHttpServer())
          .get('/admin/posts')
          .expect(406);

        return done();
      });
      it('should response correct', async done => {
        const { body } = await request(app.getHttpServer())
          .get('/admin/posts')
          .expect(200);

        expect(body).toMatchSchema(paginated(AdminPostSchema));

        return done();
      });
    });
  });
});
