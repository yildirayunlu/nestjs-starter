import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { User } from '@/user/entities/user.entity';
import { Comment } from '@/post/entities/comment.entity';
import { BaseEntity } from '@/database/base.entity';

@Entity()
export class Post extends BaseEntity {
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

  @OneToMany(() => Comment, comment => comment.post, {
    eager: true,
  })
  comments?: Comment[];
}
