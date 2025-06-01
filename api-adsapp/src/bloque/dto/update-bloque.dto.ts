import { PartialType } from '@nestjs/mapped-types';
import { CreateBloqueDto } from './create-bloque.dto';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateBloqueDto extends PartialType(CreateBloqueDto) {
    
    @IsOptional()
    @IsDate()
    fechaInicio: Date;
    
    @IsNotEmpty()
    @IsDate()
    fechaFin: Date;
}
