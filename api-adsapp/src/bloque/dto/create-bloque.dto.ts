import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateBloqueDto {
    @IsNotEmpty()
    @IsNumber()
    idCurso: number;

    @IsNotEmpty()
    @IsNumber()
    idProfesor: number;

    @IsNotEmpty()
    @IsDate()
    fechaInicio: Date;

    @IsNotEmpty()
    @IsDate()
    fechaFin: Date;

}
