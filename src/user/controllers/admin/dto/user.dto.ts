import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  roles: string[];

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
