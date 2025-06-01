import { Injectable } from '@nestjs/common';
import { CreateSolicitudintDto } from './dto/create-solicitudint.dto';
import { UpdateSolicitudintDto } from './dto/update-solicitudint.dto';

@Injectable()
export class SolicitudintService {
  create(createSolicitudintDto: CreateSolicitudintDto) {
    return 'This action adds a new solicitudint';
  }

  findAll() {
    return `This action returns all solicitudint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solicitudint`;
  }

  update(id: number, updateSolicitudintDto: UpdateSolicitudintDto) {
    return `This action updates a #${id} solicitudint`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitudint`;
  }
}
