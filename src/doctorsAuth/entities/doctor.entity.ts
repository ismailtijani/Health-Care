import { Appointment } from 'src/appointments/entities';
import { DoctorSpecialization } from 'src/shared/constants';
import { BaseEntity } from 'src/shared/entities';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class DoctorEntity extends BaseEntity {
  @Column()
  doctorId: string;

  @Column({ type: 'enum', enum: DoctorSpecialization })
  specialization: DoctorSpecialization;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments: Appointment[];

  //   @OneToMany(() => DoctorAvailability, (availability) => availability.doctor)
  //   availabilities: DoctorAvailability[];
}
