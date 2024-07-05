import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { AppoinmentStatus } from 'src/shared/constants';

export class AppointmentQueryDto {
  /** @example 451 */
  @IsOptional()
  @IsNumber()
  studentId: number;

  /** @example 1 */
  @IsOptional()
  @IsNumber()
  doctorId: number;

  /** @example 2024-06-29 */
  @IsOptional()
  @IsDateString()
  startDate: Date;

  /** @example 2024-06-29 */
  @IsOptional()
  @IsDateString()
  endDate?: string;

  /** @example cancelled */
  @IsOptional()
  @IsEnum(AppoinmentStatus)
  status: AppoinmentStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
