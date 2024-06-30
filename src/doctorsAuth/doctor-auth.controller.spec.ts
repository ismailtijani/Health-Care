import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAuthController } from './doctor-auth.controller';
import { DoctorAuthService } from './doctor-auth.service';

describe('DoctorAuthController', () => {
  let controller: DoctorAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorAuthController],
      providers: [DoctorAuthService],
    }).compile();

    controller = module.get<DoctorAuthController>(DoctorAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
