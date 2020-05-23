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
@Controller('users')
@ApiTags('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
