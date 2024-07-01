import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DoctorAuthService } from './doctor-auth.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from 'src/shared/dto';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard } from 'src/shared/guards';
import { Request } from 'express';

@ApiTags('DoctorAuth')
@Controller('auth/doctor')
export class DoctorAuthController {
  constructor(private readonly doctorAuthService: DoctorAuthService) {}

  /** API Endpoint for Doctor Registration */
  @Post('signup')
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorAuthService.createDoctor(createDoctorDto);
  }

  /**
   * This endpoint logs the doctor in
   * a 401 error is thrown if endpoint doesn't exist
   * @param loginDetails
   */
  @Post('login')
  login(@Body() loginDetails: LoginDto) {
    return this.doctorAuthService.login(loginDetails);
  }

  /** API Endpoint to Logout Doctor */
  // @Get('logout')
  // // @UseGuards(JwtGuard)
  // @HttpCode(HttpStatus.OK)
  // async logout(@Req() req: Request) {
  //   await this.doctorAuthService.logout(req.user['id']);
  //   return 'You have successfully logout of the system, see you soon!';
  // }

  /**
   * This endpoint is  called when a doctor forgots his/her password
   * @param forgotPasswordData
   */
  @Post('password/forgot')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() forgotPasswordData: ForgotPasswordDto) {
    return this.doctorAuthService.forgotPassowrd(forgotPasswordData);
  }

  /**
   * This endpoint is called when a user wants to reset his/her password
   * @param resetData
   */
  @Post('password/reset')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetData: ResetPasswordDto) {
    return this.doctorAuthService.resetPassword(resetData);
  }

  /** API Endpoint to get Refresh Tokens */
  @Get('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request) {
    const user = req.user;
    return this.doctorAuthService.refreshToken(
      user['refreshToken'],
      user['payload'],
    );
  }
}
