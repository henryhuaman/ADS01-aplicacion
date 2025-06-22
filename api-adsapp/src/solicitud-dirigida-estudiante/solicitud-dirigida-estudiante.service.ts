import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSolicitudDirigidaEstudianteDto } from './dto/create-solicitud-dirigida-estudiante.dto';
import { UpdateSolicitudDirigidaEstudianteDto } from './dto/update-solicitud-dirigida-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitudDirigidaEstudiante } from './entities/solicitud-dirigida-estudiante.entity';
import { Repository } from 'typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class SolicitudDirigidaEstudianteService {

  constructor(
    @InjectRepository(SolicitudDirigidaEstudiante)
    private readonly solicitudRepository: Repository<SolicitudDirigidaEstudiante>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async create(createDto: CreateSolicitudDirigidaEstudianteDto): Promise<SolicitudDirigidaEstudiante | any> {
    
    const estudiante = await this.estudianteRepository.findOneBy({ 
      idEstudiante: createDto.idEstudiante 
    });
    if (!estudiante) {
      return new HttpException(
        `Estudiante con ID ${createDto.idEstudiante} no encontrado`, HttpStatus.NOT_FOUND)
    }

    const curso = await this.cursoRepository.findOneBy({ 
      idCurso: createDto.idCurso 
    });
    if (!curso) {
      return new HttpException(
        `Curso con ID ${createDto.idCurso} no encontrado`, HttpStatus.NOT_FOUND)
    }


    const solicitud = this.solicitudRepository.create({
      fechaSolicitudEgresado: createDto.fechaSolicitudEgresado,
      estadoResolucion: createDto.estadoResolucion,
      descripcion: createDto.descripcion,
      estudiante: estudiante,
      curso
    });

    return this.solicitudRepository.save(solicitud);
  }

  async findAll(): Promise<SolicitudDirigidaEstudiante[] | any> {
    const solicitudes = await this.solicitudRepository.find({
      relations: ['estudiante', 'curso'],
    });

    if (!solicitudes || solicitudes.length === 0) {
      return new HttpException('No hay solicitudes dirigidas de estudiantes', HttpStatus.NOT_FOUND);
    }

    return solicitudes;
  }

  async findOne(id: number): Promise<SolicitudDirigidaEstudiante | any> {
    const solicitud = await this.solicitudRepository.findOne({
      where: { idSolicitud: id },
      relations: ['interesado', 'curso'],
    });

    if (!solicitud) {
      return new HttpException(`Solicitud con ID ${id} no encontrada`, HttpStatus.NOT_FOUND);
    }
    return solicitud;
  }

  async update(id: number, updateDto: UpdateSolicitudDirigidaEstudianteDto): Promise<SolicitudDirigidaEstudiante | any> {
    const solicitud = await this.findOne(id);
    if (solicitud instanceof HttpException) {
      return solicitud;
    }

    if (updateDto.idEstudiante) {
      const estudiante = await this.estudianteRepository.findOneBy({ 
        idEstudiante: updateDto.idEstudiante 
      });
      if (!estudiante) {
        return new HttpException(
          `Estudiante con ID ${updateDto.idEstudiante} no encontrado`, HttpStatus.NOT_FOUND)
      }

      solicitud.interesado = estudiante;
    }

    if (updateDto.idCurso) {
      const curso = await this.cursoRepository.findOneBy({ 
        idCurso: updateDto.idCurso 
      });
      if (!curso) {
        return new HttpException(
          `Curso con ID ${updateDto.idCurso} no encontrado`, HttpStatus.NOT_FOUND)
      }
      solicitud.curso = curso;
    }

    if (updateDto.estadoResolucion) solicitud.estadoResolucion = updateDto.estadoResolucion;
    if (updateDto.descripcion !== undefined) solicitud.descripcion = updateDto.descripcion;

    return this.solicitudRepository.save(solicitud);
  }

  async remove(id: number): Promise<void | any> {
    const result = await this.solicitudRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException(
        `Solicitud con ID ${id} no encontrada`, HttpStatus.NOT_FOUND)
    }
    return result;
  }
}
