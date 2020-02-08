import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// controllers
import { UserController } from './user.controller';

// entities
import { User } from './user.entity';

// services
import { UserService } from './user.service';

// modules
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
