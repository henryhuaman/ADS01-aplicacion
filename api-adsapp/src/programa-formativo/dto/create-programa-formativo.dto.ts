import { Optional } from "@nestjs/common";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateProgramaFormativoDto {
    @IsNotEmpty()
    @IsString()
    nombrePrograma: string;

    @Optional()
    @IsString()
    descripcion?: string;

}
