import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import * as crypto from 'crypto';

import { Post } from '@/post/entities/post.entity';
import { Comment } from '@/post/entities/comment.entity';
import { BaseEntity } from '@/database/base.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  firstName: string;

  @IsNotEmpty()
  @Column()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @Length(6, 32)
  plainPassword: string;

  @Column({ type: 'simple-json', nullable: true })
  roles: string[];

  @BeforeInsert()
  hashPlainPassword() {
    this.password = crypto
      .createHmac('sha256', this.plainPassword)
      .digest('hex');
  }

  @OneToMany(() => Post, post => post.user)
  posts?: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments?: Comment[];
}
