import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudDirigidaEstudianteDto } from './create-solicitud-dirigida-estudiante.dto';

export class UpdateSolicitudDirigidaEstudianteDto extends PartialType(CreateSolicitudDirigidaEstudianteDto) {}
