import { PartialType } from '@nestjs/mapped-types';
import { CreateInteresadoPfDto } from './create-interesado-pf.dto';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateInteresadoPfDto extends PartialType(CreateInteresadoPfDto) {
    @IsDate()
    @IsOptional()
    fechaInicio?: Date;

    @IsDate()
    @IsOptional()
    fechaFin?: Date;
}
