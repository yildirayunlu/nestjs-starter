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
import { paginatedAdmin, AdminPostSchema } from '../schema';
import { loginUser } from '../utils/User';

describe('AdminPostController (e2e)', () => {
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

  let token: string;

  describe('[GET] admin/posts', () => {
    it('should unauthorized response', async done => {
      await request(app.getHttpServer())
        .get('/admin/posts')
        .expect(401);

      return done();
    });

    it('should response correctly', async done => {
      const user = await loginUser(app, {
        email: 'admin@mail.com',
        password: 'password',
      });
      // set admin user token
      token = user.token;

      const { body } = await request(app.getHttpServer())
        .get('/admin/posts')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toMatchSchema(paginatedAdmin(AdminPostSchema));

      return done();
    });
  });

  describe('[POST] admin/posts', () => {
    it('should unauthorized response', async done => {
      await request(app.getHttpServer())
        .post('/admin/posts')
        .expect(401);

      return done();
    });

    it('should validation response', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/admin/posts')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(body.error).toStrictEqual('Bad Request');
      expect(body.message).toStrictEqual([
        'title should not be empty',
        'content should not be empty',
        'user should not be empty',
      ]);

      return done();
    });

    it('should create correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/admin/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'test',
          content: 'test content',
          user: {
            id: 2,
          },
        })
        .expect(201);

      expect(body).toMatchSchema(AdminPostSchema);
      expect(body.title).toBe('test');
      expect(body.content).toBe('test content');
      expect(body.user.id).toBe(2);
      expect(body.user.email).toBe('test2@mail.com');

      return done();
    });
  });

  describe('[GET] admin/posts/{id}', () => {
    it('should unauthorized response', async done => {
      await request(app.getHttpServer())
        .get('/admin/posts/1')
        .expect(401);

      return done();
    });

    it('should not found response', async done => {
      const { body } = await request(app.getHttpServer())
        .get('/admin/posts/99')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(body.error).toStrictEqual('Not Found');
      expect(body.message).toBe('Post not found');

      return done();
    });

    it('should response correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .get('/admin/posts/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toMatchSchema(AdminPostSchema);

      return done();
    });
  });

  describe('[PATCH] admin/posts/{id}', () => {
    it('should unauthorized response', async done => {
      await request(app.getHttpServer())
        .patch('/admin/posts/1')
        .expect(401);

      return done();
    });

    it('should not found response', async done => {
      const { body } = await request(app.getHttpServer())
        .patch('/admin/posts/99')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(body.error).toStrictEqual('Not Found');
      expect(body.message).toBe('Post not found');

      return done();
    });

    it('should response correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .patch('/admin/posts/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'updated',
          user: {
            id: 3,
          },
        })
        .expect(200);

      expect(body).toMatchSchema(AdminPostSchema);
      // should update
      expect(body.title).toBe('updated');
      expect(body.user.id).toBe(3);
      expect(body.user.email).toBe('test3@mail.com');
      // should not update
      expect(body.content).toBe('Test Content');

      return done();
    });
  });

  describe('[DELETE] admin/posts/{id}', () => {
    it('should unauthorized response', async done => {
      await request(app.getHttpServer())
        .patch('/admin/posts/1')
        .expect(401);

      return done();
    });

    it('should not found response', async done => {
      const { body } = await request(app.getHttpServer())
        .patch('/admin/posts/99')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(body.error).toStrictEqual('Not Found');
      expect(body.message).toBe('Post not found');

      return done();
    });

    it('should response correctly', async done => {
      await request(app.getHttpServer())
        .delete('/admin/posts/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      return done();
    });

    it('should not found response', async done => {
      await request(app.getHttpServer())
        .delete('/admin/posts/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
      return done();
    });
  });
});
