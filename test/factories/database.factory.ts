import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigService } from '../../src/config/config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('TYPEORM_CONNECTION') as 'mysql',
      host: this.configService.get('TYPEORM_HOST'),
      port: Number(this.configService.get('TYPEORM_PORT')),
      username: this.configService.get('TYPEORM_USERNAME'),
      password: this.configService.get('TYPEORM_PASSWORD'),
      database: this.configService.get('TYPEORM_DATABASE'),
      entities: ['dist/**/**.entity.js'],
      synchronize: true,
      dropSchema: true,
    };
  }
}
