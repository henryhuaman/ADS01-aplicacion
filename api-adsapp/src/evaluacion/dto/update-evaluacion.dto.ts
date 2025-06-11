import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluacionDto } from './create-evaluacion.dto';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateEvaluacionDto extends PartialType(CreateEvaluacionDto) {
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(20)
    notaEvaluacion?: number;

    @IsOptional()
    @IsString()
    tipoEvaluacion?: string;
}
