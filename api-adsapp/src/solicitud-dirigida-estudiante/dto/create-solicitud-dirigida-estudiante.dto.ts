import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateSolicitudDirigidaEstudianteDto {

    @IsNotEmpty()
    @IsNumber()
    idEstudiante: number;

    @IsNotEmpty()
    @IsNumber()
    idCurso: number;


    @IsNotEmpty()
    @IsDate()
    fechaSolicitudEgresado: Date;


    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    estadoResolucion: string;


    @IsString()
    descripcion?: string;
}
