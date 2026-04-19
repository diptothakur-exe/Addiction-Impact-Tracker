import { IsIn, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { AddictionType } from '../../../common/types';

export class InputDto {
  @IsIn(['cigarettes', 'alcohol', 'porn'])
  type: AddictionType;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  @Max(9999)
  intensity: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  @Max(80)
  years: number;

  @IsOptional()
  @Transform(({ value }) => (value ? parseFloat(value) : 25))
  @IsNumber()
  @Min(10)
  @Max(100)
  age?: number;
}
