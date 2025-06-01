import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { IsDate, IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {
  @IsOptional()
  @IsString()
  nombreEstudiante?: string;

  @IsOptional()
  @IsString()
  apellidoEstudiante?: string;

  @IsOptional()
  @IsString()
  @Length(8, 8)
  dniEstudiante?: string;

  @IsOptional()
  @IsDate()
  fechaNacimientoEstudiante?: Date;

  @IsOptional()
  @IsEmail()
  correoEstudiante?: string;

  @IsOptional()
  @IsString()
  @Length(8, 20)
  contraseñaEstudiante?: string;

  @IsOptional()
  @IsString()
  codigoMatricula?: string;
}
