import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudDirigidaEstudianteDto } from './create-solicitud-dirigida-estudiante.dto';
import { IsDate, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSolicitudDirigidaEstudianteDto extends PartialType(CreateSolicitudDirigidaEstudianteDto) {
    @IsOptional()
    @IsNumber()
    idEstudiante?: number;

    @IsOptional()
    @IsNumber()
    idCurso?: number;


    @IsOptional()
    @IsString()
    @MaxLength(10)
    estadoResolucion?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;
}
