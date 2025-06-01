

import { IsNotEmpty, IsString, Length, IsEmail, Matches } from 'class-validator';

export class CreateInteresadoDto {
    @IsNotEmpty()
  @IsString()
  nombreInteresado: string;

  @IsNotEmpty()
  @IsString()
  apellidoInteresado: string;

  @IsNotEmpty()
  @IsString()
    @Length(8, 8)
  dniInteresado: string;

  @IsNotEmpty()
  @IsEmail()
  correoInteresado: string;

  @IsNotEmpty()
  @IsString()
  contraseñaInteresado: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]+$/)
  telefonoInteresado: string;
}
