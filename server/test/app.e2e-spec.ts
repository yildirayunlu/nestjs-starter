import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            type: configService.get('TYPEORM_CONNECTION') as any,
            host: configService.get('TYPEORM_HOST'),
            port: Number(configService.get('TYPEORM_PORT')),
            username: configService.get('TYPEORM_USERNAME'),
            password: configService.get('TYPEORM_PASSWORD'),
            database: configService.get('TYPEORM_DATABASE'),
            entities: ['dist/**/**.entity.js'],
            synchronize: true,
            dropSchema: true,
          }),
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
