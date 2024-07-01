import { DoctorEntity } from 'src/doctorsAuth/entities/doctor.entity';
import { AppoinmentStatus } from 'src/shared/constants';
import { Student } from 'src/studentsAuth/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Student, (student) => student.appointments)
  student: Student;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.appointments)
  doctor: DoctorEntity;

  @Column({ type: 'datetime' })
  appointmentDate: Date;

  @Column({ type: 'time' })
  time: string;

  @Column({
    type: 'enum',
    enum: AppoinmentStatus,
    default: AppoinmentStatus.SCHEDULED,
  })
  status: AppoinmentStatus;

  @Column({ nullable: true })
  complains: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  //   @CreateDateColumn()
  //   createdAt: Date;

  //   @UpdateDateColumn()
  //   updatedAt: Date;
}
