import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateEvaluacionDto {
    @IsNotEmpty()
    @IsNumber()
    idEstudiante: number;

    @IsNotEmpty()
    @IsNumber()
    idCurso: number;

    @IsNotEmpty()
    @IsNumber()
    idProfesor: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(20)
    notaEvaluacion: number;

    @IsNotEmpty()
    @IsString()
    tipoEvaluacion: string;
}
