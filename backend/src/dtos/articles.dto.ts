/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, MinLength, MaxLength, Min } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  public title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(1000)
  public description: string;

  @IsString()
  @IsNotEmpty()
  @Min(1)
  public prix: number;
}
