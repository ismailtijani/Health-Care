import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/studentsAuth/entities';
import { JwtPayload } from '../../shared/typeDef.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  logger: Logger;
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET'),
    });
    this.logger = new Logger(JwtStrategy.name);
  }

  async validate(payload: JwtPayload) {
    const student = await this.studentRepository.findOneBy({ id: payload.sub });
    if (!student) throw new NotFoundException('User not found');
    return student;
  }
}
