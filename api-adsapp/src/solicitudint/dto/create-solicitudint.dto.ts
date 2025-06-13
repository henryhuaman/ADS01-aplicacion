import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSolicitudintDto {
    @IsDate()
    @IsNotEmpty()
    fechaSolicitudEgresado: Date;

    @IsString()
    @IsNotEmpty()
    documentoSolicitado: string;

    @IsString()
    @IsNotEmpty()
    estadoTramite: string;

    @IsString()
    @IsOptional()
    observacionSolicitud?: string;

    @IsNotEmpty()
    idInteresado: number;

    @IsNotEmpty()
    idProgramaFormativo: number;

}
