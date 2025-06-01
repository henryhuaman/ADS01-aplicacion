import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesorDto } from './create-profesor.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateProfesorDto extends PartialType(CreateProfesorDto) {
    @IsOptional()
    @IsString()
    nombreProfesor?: string;

    @IsOptional()
    @IsString()
    apellidoProfesor?: string;

    @IsOptional()
    @IsEmail()
    correoProfesor?: string;

    @IsOptional()
    @IsString()
    contraseñaProfesor: string;

    @IsOptional()
    @IsString()
    estadoProfesor?: string;
}
