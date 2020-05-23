import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { User } from '@/user/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  title: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  content?: string;

  @ManyToOne(() => User, user => user.posts, {
    eager: true,
  })
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
