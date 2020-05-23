import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { User } from '@/user/entities/user.entity';
import { BaseEntity } from '@/database/base.entity';
import { Post } from '@/post/entities/post.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({
    type: 'longtext',
    nullable: true,
  })
  comment?: string;

  @ManyToOne(() => User, user => user.posts, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}
