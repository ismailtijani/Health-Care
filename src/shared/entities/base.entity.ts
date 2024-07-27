import { Injectable } from '@nestjs/common';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @ApiHideProperty()
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;
}
