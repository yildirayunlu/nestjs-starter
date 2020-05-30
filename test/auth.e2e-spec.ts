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
import { AuthenticatedSchema, AuthenticatedUserSchema } from './schema';
import { loginUser } from './utils/User';

describe('AuthController (e2e)', () => {
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

  describe('[POST] /login', () => {
    it('should response correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@mail.com',
          password: 'password',
        })
        .expect(200);

      expect(body).toMatchSchema(AuthenticatedSchema);

      return done();
    });

    it('should form validation response', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .expect(401);

      expect(body.statusCode).toBe(401);
      expect(body.message).toBe('Unauthorized');

      return done();
    });

    it('should invalid response', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'invalid@mail.com',
          password: 'invalid',
        })
        .expect(401);

      expect(body.statusCode).toBe(401);
      expect(body.message).toBe('Unauthorized');

      return done();
    });
  });

  describe('[POST] /register', () => {
    it('should response correctly', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          firstName: 'test',
          lastName: 'test',
          email: 'e2e@mail.com',
          password: 'password',
        })
        .expect(200);

      expect(body).toMatchSchema(AuthenticatedSchema);

      return done();
    });

    it('should form validation response', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/register')
        .expect(400);

      expect(body).toStrictEqual({
        statusCode: 400,
        message: [
          'firstName should not be empty',
          'lastName should not be empty',
          'email must be an email',
          'email should not be empty',
          'password must be longer than or equal to 6 characters',
          'password should not be empty',
        ],
        error: 'Bad Request',
      });

      return done();
    });

    it('should unique email error response', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          firstName: 'test',
          lastName: 'test',
          email: 'admin@mail.com',
          password: 'password',
        })
        .expect(400);

      expect(body.statusCode).toBe(400);
      expect(body.message).toBe('User with the same email already exist');

      return done();
    });
  });

  describe('[GET] /me', () => {
    let token: string;
    it('should response correctly', async done => {
      const user = await loginUser(app, {
        email: 'admin@mail.com',
        password: 'password',
      });
      // set admin user token
      token = user.token;

      const { body } = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toMatchSchema(AuthenticatedUserSchema);
      expect(body.email).toBe('admin@mail.com');

      return done();
    });

    it('should unauthorized response', async done => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .set('Authorization', `Bearer INVALID`)
        .expect(401);

      expect(body.statusCode).toBe(401);
      expect(body.message).toBe('Unauthorized');

      return done();
    });
  });
});
