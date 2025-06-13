import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaFormativoDto } from './create-programa-formativo.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProgramaFormativoDto extends PartialType(CreateProgramaFormativoDto) {
    @IsOptional()
    @IsString()
    nombrePrograma?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;
}
