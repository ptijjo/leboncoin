/* eslint-disable prettier/prettier */
import { IsBoolean } from 'class-validator';

export class CreateValidationDto {
  @IsBoolean()
  public status: boolean;
}
