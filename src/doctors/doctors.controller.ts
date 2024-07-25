import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DoctorService } from './doctors.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard, RefreshTokenGuard } from 'src/shared/guards';
import { CreateDoctorDto } from './dto';
import { DoctorAuthService } from './auth/doctor-auth.service';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from 'src/shared/dto';
import { Public } from 'src/shared/decorators';

@ApiTags('Doctors')
@Controller('doctor')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class DoctorController {
  constructor(
    private readonly doctorsService: DoctorService,
    private readonly doctorAuthService: DoctorAuthService,
  ) {}

  /** API Endpoint for Doctor Registration */
  @Post('signup')
  @Public()
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorAuthService.createDoctor(createDoctorDto);
  }

  /**This endpoint logs the doctor in */
  //   @ApiOkResponse({ description: 'Successful' })
  // @ApiNotFoundResponse({ description: 'clientUser with id not found ' })
  // @ApiUnauthorizedResponse({ description: 'No Auth Token' })
  // @ApiQuery({ name: 'clientUser', type: ClientUserQueryParamDTO })
  // @HttpCode(200)
  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDetails: LoginDto) {
    return this.doctorAuthService.login(loginDetails);
  }

  /** API Endpoint to Logout Doctor */
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request) {
    console.log(req.user);
    await this.doctorAuthService.logout(req.user['id']);
    return 'You have successfully logout of the system, see you soon!';
  }

  /**
   * This endpoint is  called when a doctor forgots his/her password
   * @param forgotPasswordData
   */
  @Post('password/forgot')
  @Public()
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() forgotPasswordData: ForgotPasswordDto) {
    return this.doctorAuthService.forgotPassowrd(forgotPasswordData);
  }

  /**
   * This endpoint is called when a doctor wants to reset his/her password
   * @param resetData
   */
  @Post('password/reset')
  @Public()
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetData: ResetPasswordDto) {
    return this.doctorAuthService.resetPassword(resetData);
  }

  /** API Endpoint to get Refresh Tokens */
  @Get('refresh-token')
  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request) {
    const user = req.user;
    return this.doctorAuthService.refreshToken(
      user['refreshToken'],
      user['payload'],
    );
  }

  /** API Endpoint for retrieving Doctor information. */
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getDoctorProfile(@Req() req: Request) {
    return req.user;
  }

  /** API Endpoint for fetching a Doctor by ID. */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getDoctor(@Param('id') id: number) {
    return this.doctorsService.getDoctor(id);
  }

  /** API Endpoint for retrieving all registered Doctors. */
  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  getAllDoctors() {
    return this.doctorsService.getAllDoctors();
  }
}
