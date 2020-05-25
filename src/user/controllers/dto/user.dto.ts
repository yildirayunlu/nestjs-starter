import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
