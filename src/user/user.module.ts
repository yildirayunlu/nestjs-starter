import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminUserController } from '@/user/controllers/admin/user.controller';
import { UserRepository } from '@/user/repositories/user.repository';
import { UserService } from '@/user/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  exports: [UserService],
  controllers: [AdminUserController],
})
export class UserModule {}
