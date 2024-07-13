import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, UserType } from '../constants';
import { Request } from 'express';
import { JwtHandler } from '../jwt.service';
import { JwtPayload } from '../typeDef.dto';
import { DoctorService } from 'src/doctors/doctors.service';
import { StudentService } from 'src/students';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly studentService: StudentService,
    private readonly doctorService: DoctorService,
    private readonly jwtService: JwtHandler,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    request.user = await this.validateRequest(request);
    return true;
  }

  async validateRequest(request: Request) {
    const authorization = request.headers.authorization;
    if (!authorization) throw new UnauthorizedException('No Auth Token');

    const [authType, token] = authorization.split(' ');
    if (authType !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid token');

    try {
      const payload: JwtPayload = await this.jwtService.verifyToken(token);
      return await this.getUser(payload);
    } catch (error) {
      const message = `Token error: ${error.message || error.name}`;
      throw new UnauthorizedException(message);
    }
  }

  private async getUser(payload: JwtPayload) {
    if (payload.userType === UserType.Student) {
      return this.studentService.getStudent(payload.sub);
    } else if (payload.userType === UserType.Doctor) {
      return await this.doctorService.getDoctor(payload.sub);
    } else {
      throw new UnauthorizedException('Invalid user type');
    }
  }
}

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   canActivate(context: ExecutionContext) {
//     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (isPublic) return true;

//     return super.canActivate(context);
//   }
// }
