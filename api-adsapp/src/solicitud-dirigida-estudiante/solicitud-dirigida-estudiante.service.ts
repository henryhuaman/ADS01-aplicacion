import { Injectable } from '@nestjs/common';
import { CreateSolicitudDirigidaEstudianteDto } from './dto/create-solicitud-dirigida-estudiante.dto';
import { UpdateSolicitudDirigidaEstudianteDto } from './dto/update-solicitud-dirigida-estudiante.dto';

@Injectable()
export class SolicitudDirigidaEstudianteService {
  create(createSolicitudDirigidaEstudianteDto: CreateSolicitudDirigidaEstudianteDto) {
    return 'This action adds a new solicitudDirigidaEstudiante';
  }

  findAll() {
    return `This action returns all solicitudDirigidaEstudiante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solicitudDirigidaEstudiante`;
  }

  update(id: number, updateSolicitudDirigidaEstudianteDto: UpdateSolicitudDirigidaEstudianteDto) {
    return `This action updates a #${id} solicitudDirigidaEstudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitudDirigidaEstudiante`;
  }
}
