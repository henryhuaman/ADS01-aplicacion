import { IsNotEmpty, IsString } from "class-validator";

export class CreateCursoDto {
  @IsNotEmpty()
  @IsString()
  nombreCurso: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;
}
