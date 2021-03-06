import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AuthenticatedSchema } from '../schema';

interface Data {
  email: string;
  password: string;
}

export const loginUser = async (app: INestApplication, payload: Data) => {
  const { body } = await request(app.getHttpServer())
    .post('/auth/login')
    .send(payload)
    .expect(200);

  expect(body).toMatchSchema(AuthenticatedSchema);

  return body;
};
