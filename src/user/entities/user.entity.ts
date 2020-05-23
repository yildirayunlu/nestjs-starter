import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as crypto from 'crypto';

import { Post } from '@/post/entities/post.entity';
import { BaseEntity } from '@/database/base.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @IsNotEmpty()
  @Column()
  password: string;

  @Exclude()
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
}
