import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { BaseEntity } from '@/database/base.entity';
import { User } from '@/user/entities/user.entity';
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

  @ManyToOne(() => User, user => user.comments, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Post, post => post.comments, {
    onDelete: 'CASCADE',
  })
  post: Post;
}
