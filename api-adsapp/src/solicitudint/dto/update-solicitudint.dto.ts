import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudintDto } from './create-solicitudint.dto';

export class UpdateSolicitudintDto extends PartialType(CreateSolicitudintDto) {}
