import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as crypto from 'crypto';

@Entity()
export class User {
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

  @Exclude()
  @CreateDateColumn()
  createdAt?: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt?: Date;
}
