import { IsDateString, IsNotEmpty, IsString, Matches } from "class-validator";
import { Column } from "typeorm";

export class CreateDiaHoraDto {
    @IsNotEmpty()
    idBloque: number;

    @IsNotEmpty()
    @IsDateString()
    dia: Date;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
      message: 'Formato de hora inválido. Use HH:MM:SS'
    })
    horaInicio: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'Formato de hora inválido. Use HH:MM:SS'
    })
    horaFin: string;

}
