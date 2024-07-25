import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateStudentDto } from '../studentAuth/dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/studentAuth/entities';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  logger: Logger;
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {
    this.logger = new Logger(StudentService.name);
  }

  /////////// A Method to get All Students //////////////////
  getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  /////////// A Method to get A Student by ID //////////////////
  async getStudent(id: number) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student)
      throw new NotFoundException(`Student with id ${id} not found`);
    return student;
  }

  /////////// A Method to update Student //////////////////
  async updateStudent(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.getStudent(id);
    Object.assign(student, updateStudentDto);
    return this.studentRepository.save(student);
  }

  /////////// A Method to Deactivate Student //////////////////
  async deactivateStudent(id: number): Promise<string> {
    await this.studentRepository.delete({ id });
    return `Student with the id ${id} deleted successfully`;
  }

  /////////// A Method to Delete Student //////////////////
  async deleteStudent(id: number): Promise<string> {
    await this.studentRepository.delete({ id });
    return `Student with the id ${id} deleted successfully`;
  }
}
