import { Appointment } from 'src/appointments/entities';
import { DoctorSpecialization } from 'src/shared/constants';
import { BaseEntity } from 'src/shared/entities';
import * as bcrypt from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class DoctorEntity extends BaseEntity {
  @Column()
  doctorId: string;

  @Column({ type: 'enum', enum: DoctorSpecialization })
  specialization: DoctorSpecialization;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  //   @OneToMany(() => DoctorAvailability, (availability) => availability.doctor)
  //   availabilities: DoctorAvailability[];

  //Hashing User plain text password before saving using Entity Listener
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  // Enabling Serialization (Removing sensitive datas)
  constructor(partial: Partial<DoctorEntity>) {
    super();
    Object.assign(this, partial);
  }
}
