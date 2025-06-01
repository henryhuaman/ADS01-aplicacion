import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateEstudianteDto {
  @IsNotEmpty()
  @IsString()
  nombreEstudiante: string;

  @IsNotEmpty()
  @IsString()
  apellidoEstudiante: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  dniEstudiante: string;

  @IsNotEmpty()
  @IsDate()
  fechaNacimientoEstudiante: Date;

  @IsNotEmpty()
  @IsEmail()
  correoEstudiante: string;

  @IsNotEmpty()
  @IsString()
  contraseñaEstudiante: string;

  @IsNotEmpty()
  @IsString()
  codigoMatricula: string;
}
