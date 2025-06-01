import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoDto } from './create-curso.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {
    @IsOptional()
  @IsString()
  nombreCurso?: string;

  @IsOptional()
  @IsString()
  Descripcion?: string;
}
