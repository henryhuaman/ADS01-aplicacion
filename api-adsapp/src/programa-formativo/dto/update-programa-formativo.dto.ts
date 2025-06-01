import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaFormativoDto } from './create-programa-formativo.dto';

export class UpdateProgramaFormativoDto extends PartialType(CreateProgramaFormativoDto) {}
