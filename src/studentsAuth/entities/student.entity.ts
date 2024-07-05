import { UserType } from 'src/shared/constants';
import { BaseEntity } from 'src/shared/entities';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Entity()
export class Student extends BaseEntity {
  @Column()
  matricNumber: string;

  @Column()
  department: string;

  @Column()
  faculty: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.Student })
  userType: UserType;

  @OneToMany(() => Appointment, (appointment) => appointment.student)
  appointments: Appointment[];

  //Hashing User plain text password before saving using Entity Listener
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  // Enabling Serialization (Removing sensitive datas)
  constructor(partial: Partial<Student>) {
    super();
    Object.assign(this, partial);
  }
}
