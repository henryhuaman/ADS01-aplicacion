import { PartialType } from '@nestjs/mapped-types';
import { CreateDiaHoraDto } from './create-dia-hora.dto';
import { Column } from 'typeorm';
import { IsDateString, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateDiaHoraDto extends PartialType(CreateDiaHoraDto) {

    @IsOptional()
    @IsDateString()
    dia?: Date;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    horaInicio: string;
    
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    horaFin: string;
}
