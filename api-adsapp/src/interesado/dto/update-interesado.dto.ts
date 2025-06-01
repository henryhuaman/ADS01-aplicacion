import { PartialType } from '@nestjs/mapped-types';
import { CreateInteresadoDto } from './create-interesado.dto';
import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateInteresadoDto extends PartialType(CreateInteresadoDto) {
  @IsOptional()
  @IsString()
  nombreInteresado?: string;

  @IsOptional()
  @IsString()
  apellidoInteresado?: string;

  @IsOptional()
  @IsString()
  @Length(8, 8)
  dniInteresado?: string;

  @IsOptional()
  @IsEmail()
  correoInteresado?: string;

  @IsOptional()
  @IsString()
  contraseñaInteresado?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9]+$/)
  telefonoInteresado?: string;
}
