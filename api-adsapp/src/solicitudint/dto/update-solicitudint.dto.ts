import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudintDto } from './create-solicitudint.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateSolicitudintDto extends PartialType(CreateSolicitudintDto) {

    @IsDate()
    @IsOptional()
    fechaSolicitudEgresado?: Date;

    @IsString()
    @IsOptional()
    documentoSolicitado?: string;

    @IsString()
    @IsOptional()
    estadoTramite?: string;

    @IsString()
    @IsOptional()
    observacionSolicitud?: string;

}
