import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import * as crypto from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Length(6, 32)
  @Column()
  password: string;

  @Column({ type: 'simple-json', nullable: true })
  roles: string[];

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
