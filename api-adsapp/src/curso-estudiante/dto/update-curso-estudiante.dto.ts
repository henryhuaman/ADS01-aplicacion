import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoEstudianteDto } from './create-curso-estudiante.dto';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateCursoEstudianteDto extends PartialType(CreateCursoEstudianteDto) {
    @IsOptional()
      @IsDate()
      fechaFin?: Date;
}
