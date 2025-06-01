import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateProfesorDto {

    @IsNotEmpty()
    @IsString()
    nombreProfesor: string;


    @IsNotEmpty()
    @IsString()
    apellidoProfesor: string;

    @IsNotEmpty()
    @IsEmail()
    correoProfesor: string;

    @IsNotEmpty()
    @IsString()
    contraseñaProfesor: string;

    @IsNotEmpty()
    @IsString()
    estadoProfesor: string;
}
