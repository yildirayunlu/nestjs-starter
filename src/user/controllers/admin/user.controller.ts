import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/services/user.service';

@Crud({
  model: {
    type: User,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@Controller('admin/users')
@ApiTags('admin-users')
export class AdminUserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
