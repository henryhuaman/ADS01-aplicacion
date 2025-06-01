import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCursoEstudianteDto {
    @IsNotEmpty()
  @IsNumber()
  idEstudiante: number;

  @IsNotEmpty()
  @IsNumber()
  idCurso: number;

  @IsOptional()
  @IsDate()
  fechaFin?: Date;
}
