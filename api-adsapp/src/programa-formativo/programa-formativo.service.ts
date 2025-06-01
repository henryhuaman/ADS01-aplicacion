import { Injectable } from '@nestjs/common';
import { CreateProgramaFormativoDto } from './dto/create-programa-formativo.dto';
import { UpdateProgramaFormativoDto } from './dto/update-programa-formativo.dto';

@Injectable()
export class ProgramaFormativoService {
  create(createProgramaFormativoDto: CreateProgramaFormativoDto) {
    return 'This action adds a new programaFormativo';
  }

  findAll() {
    return `This action returns all programaFormativo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programaFormativo`;
  }

  update(id: number, updateProgramaFormativoDto: UpdateProgramaFormativoDto) {
    return `This action updates a #${id} programaFormativo`;
  }

  remove(id: number) {
    return `This action removes a #${id} programaFormativo`;
  }
}
