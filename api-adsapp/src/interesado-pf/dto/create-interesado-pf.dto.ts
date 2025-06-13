import { IsDate, IsNotEmpty } from "class-validator";

export class CreateInteresadoPfDto {
    @IsDate()
    @IsNotEmpty()
    fechaInicio: Date;

    @IsDate()
    @IsNotEmpty()
    fechaFin: Date;

    @IsNotEmpty()
    idPrograma: number;

    @IsNotEmpty()
    idInteresado: number;
}
