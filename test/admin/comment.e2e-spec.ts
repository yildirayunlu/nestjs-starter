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
import { paginatedAdmin, AdminCommentSchema } from '../schema';
import { loginUser } from '../utils/User';

describe('AdminCommentController (e2e)', () => {
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

  describe('[GET] admin/comments', () => {
    it('should unauthorized response', async done => {
      await request(app.getHttpServer())
        .get('/admin/comments')
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
        .get('/admin/comments')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toMatchSchema(paginatedAdmin(AdminCommentSchema));

      return done();
    });
  });

  describe('[POST] admin/comments', () => {
    it('should unauthorized response', async done => {
      await request(app.getHttpServer())
        .post('/admin/comments')
        .expect(401);

      return done();
    });

    it('should validation response', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/admin/comments')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(body.error).toStrictEqual('Bad Request');
      expect(body.message).toStrictEqual([
        'comment should not be empty',
        'user should not be empty',
        'post should not be empty',
      ]);

      return done();
    });

    it('should create correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/admin/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          comment: 'test comment',
          user: {
            id: 1,
          },
          post: {
            id: 1,
          },
        })
        .expect(201);

      expect(body).toMatchSchema(AdminCommentSchema);
      expect(body.comment).toBe('test comment');
      expect(body.user.id).toBe(1);
      expect(body.post.id).toBe(1);

      return done();
    });
  });

  describe('[GET] admin/comments/{id}', () => {
    it('should unauthorized response', async done => {
      await request(app.getHttpServer())
        .get('/admin/comments/1')
        .expect(401);

      return done();
    });

    it('should not found response', async done => {
      const { body } = await request(app.getHttpServer())
        .get('/admin/comments/99')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(body.error).toStrictEqual('Not Found');
      expect(body.message).toBe('Comment not found');

      return done();
    });

    it('should response correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .get('/admin/comments/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toMatchSchema(AdminCommentSchema);

      return done();
    });
  });

  describe('[PATCH] admin/comments/{id}', () => {
    it('should unauthorized response', async done => {
      await request(app.getHttpServer())
        .patch('/admin/comments/1')
        .expect(401);

      return done();
    });

    it('should not found response', async done => {
      const { body } = await request(app.getHttpServer())
        .patch('/admin/comments/99')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(body.error).toStrictEqual('Not Found');
      expect(body.message).toBe('Comment not found');

      return done();
    });

    it('should response correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .patch('/admin/comments/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          comment: 'updated',
          user: {
            id: 3,
          },
        })
        .expect(200);

      expect(body).toMatchSchema(AdminCommentSchema);
      // should update
      expect(body.comment).toBe('updated');
      expect(body.user.id).toBe(3);
      expect(body.user.email).toBe('test3@mail.com');
      // should not update
      expect(body.post.id).toBe(1);

      return done();
    });
  });

  describe('[DELETE] admin/comments/{id}', () => {
    it('should unauthorized response', async done => {
      await request(app.getHttpServer())
        .patch('/admin/comments/1')
        .expect(401);

      return done();
    });

    it('should not found response', async done => {
      const { body } = await request(app.getHttpServer())
        .patch('/admin/comments/99')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(body.error).toStrictEqual('Not Found');
      expect(body.message).toBe('Comment not found');

      return done();
    });

    it('should response correctly', async done => {
      await request(app.getHttpServer())
        .delete('/admin/comments/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      return done();
    });

    it('should not found response', async done => {
      await request(app.getHttpServer())
        .delete('/admin/comments/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
      return done();
    });
  });
});
