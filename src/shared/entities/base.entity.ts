import { Injectable } from '@nestjs/common';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Injectable()
export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  gender: string;

  @ApiHideProperty()
  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @ApiHideProperty()
  @Column({ nullable: true })
  @Exclude()
  resetPasswordToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
