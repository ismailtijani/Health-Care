import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorEntity } from '../entities/doctor.entity';
import { JwtPayload } from 'src/shared';

@Injectable()
export class DoctorJwtStrategy extends PassportStrategy(
  Strategy,
  'doctor_jwt_guard',
) {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);
    const doctor = await this.doctorRepository.findOneBy({ id: payload.sub });
    console.log(doctor);
    if (!doctor) throw new UnauthorizedException('Access Denied!!!');
    return doctor;
  }
}
