// import { Exclude, Expose } from 'class-transformer';
// import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
// import { DoctorSpecialization } from 'src/shared/constants';
// import { Student } from 'src/studentAuth/entities';

// export class DoctorResponseDto {
//   @Expose()
//   id: number;

//   @Expose()
//   firstName: string;

//   @Expose()
//   lastName: string;

//   @Expose()
//   email: string;

//   @Expose()
//   phoneNumber: string;

//   @Expose()
//   gender: string;

//   @Expose()
//   doctorId: string;

//   @Expose()
//   specialization: DoctorSpecialization;

//   constructor(doctor: DoctorEntity) {
//     this.id = doctor.id;
//     this.firstName = doctor.firstName;
//     this.lastName = doctor.lastName;
//     this.email = doctor.email;
//     this.phoneNumber = doctor.phoneNumber;
//     this.gender = doctor.gender;
//     this.doctorId = doctor.doctorId;
//     this.specialization = doctor.specialization;
//   }
// }

// export class StudentResponseDto {
//   id: number;

//   firstName: string;

//   lastName: string;

//   email: string;

//   phoneNumber: string;

//   gender: string;

//   matricNumber: string;

//   department: string;

//   faculty: string;
//   //   @Expose()
//   //   id: number;

//   //   @Expose()
//   //   firstName: string;

//   //   @Expose()
//   //   lastName: string;

//   //   @Expose()
//   //   email: string;

//   //   @Expose()
//   //   phoneNumber: string;

//   //   @Expose()
//   //   gender: string;

//   //   @Expose()
//   //   matricNumber: string;

//   //   @Expose()
//   //   department: string;

//   //   @Expose()
//   //   faculty: string;

//   constructor(student: Student) {
//     this.id = student.id;
//     this.firstName = student.firstName;
//     this.lastName = student.lastName;
//     this.email = student.email;
//     this.phoneNumber = student.phoneNumber;
//     this.matricNumber = student.matricNumber;
//     this.faculty = student.faculty;
//     this.department = student.department;
//     this.gender = student.gender;
//   }
// }

// export class AppointmentResponseDto {
//   @Expose()
//   id: number;

//   @Expose()
//   date: Date;

//   @Expose()
//   time: string;

//   @Expose()
//   studentName: string;

//   @Expose()
//   student: StudentResponseDto;

//   @Expose()
//   doctor: DoctorResponseDto;

//   constructor(partial: Partial<AppointmentResponseDto>) {
//     Object.assign(this, partial);
//     this.doctor = new DoctorResponseDto(partial.doctor);
//   }
// }
