import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

export abstract class BaseEntity {
  @Expose({
    groups: ['admin'],
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Expose({
    groups: ['admin'],
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
