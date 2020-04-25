import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<'mysql'>('TYPEORM_CONNECTION'),
      host: this.configService.get<string>('TYPEORM_HOST'),
      port: this.configService.get<number>('TYPEORM_PORT'),
      username: this.configService.get<string>('TYPEORM_USERNAME'),
      password: this.configService.get<string>('TYPEORM_PASSWORD'),
      database: this.configService.get<string>('TYPEORM_DATABASE'),
      entities: ['dist/**/**.entity.js'],
      synchronize: true,
      dropSchema: true,
    };
  }
}
