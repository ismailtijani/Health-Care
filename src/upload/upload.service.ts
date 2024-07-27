import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/doctors/entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    // @InjectRepository(Student)
    // private studentsRepository: Repository<Student>,
    @InjectRepository(DoctorEntity)
    private doctorsRepository: Repository<DoctorEntity>,
    // @InjectRepository(Document)
    // private documentsRepository: Repository<Document>,
  ) {}

  async saveProfilePicture(userId: number, imageUrl: string): Promise<void> {
    const doctor = await this.doctorsRepository.findOne({
      where: { id: userId },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID "${userId}" not found`);
    }
    doctor.profilePictureUrl = imageUrl;
    await this.doctorsRepository.save(doctor);
  }

  //   async saveDocument(
  // //     userId: number,
  // //     documentUrl: string,
  // //     filename: string,
  // //   ): Promise<void> {
  // //     const doctor = await this.doctorsRepository.findOne({
  // //       where: { id: userId },
  // //     });
  // //     if (!doctor) {
  // //       throw new NotFoundException(`Doctor with ID "${userId}" not found`);
  // //     }
  // //     const document = new Document();
  // //     document.url = documentUrl;
  // //     document.filename = filename;
  // //     document.user = doctor;
  // //     await this.documentsRepository.save(document);
  // //   }

  async getProfilePictureUrl(userId: number): Promise<string> {
    const user = await this.doctorsRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
    return user.profilePictureUrl;
  }

  //   async getUserDocuments(userId: string): Promise<Document[]> {
  //     const user = await this.usersRepository.findOne(userId, {
  //       relations: ['documents'],
  //     });
  //     if (!user) {
  //       throw new NotFoundException(`User with ID "${userId}" not found`);
  //     }
  //     return user.documents;
  //   }
}
