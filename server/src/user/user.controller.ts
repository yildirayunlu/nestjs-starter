import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

// entities
import { User } from './user.entity';

// services
import { UserService } from './user.service';

@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
