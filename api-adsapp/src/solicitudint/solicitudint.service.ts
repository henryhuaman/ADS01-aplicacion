import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSolicitudintDto } from './dto/create-solicitudint.dto';
import { UpdateSolicitudintDto } from './dto/update-solicitudint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solicitudint } from './entities/solicitudint.entity';
import { Interesado } from 'src/interesado/entities/interesado.entity';
import { Repository } from 'typeorm';
import { ProgramaFormativo } from 'src/programa-formativo/entities/programa-formativo.entity';

@Injectable()
export class SolicitudintService {
  constructor(
    @InjectRepository(Solicitudint)
    private solicitudintRepository: Repository<Solicitudint>,
    @InjectRepository(Interesado)
    private interesadoRepository: Repository<Interesado>,
    @InjectRepository(ProgramaFormativo)
    private programaFormativoRepository: Repository<ProgramaFormativo>,
  ) {}

  async create(createSolicitudintDto: CreateSolicitudintDto): Promise<Solicitudint | any> {
    const interesado = await this.interesadoRepository.findOne({
      where: { idInteresado: createSolicitudintDto.idInteresado },
    });
    if (!interesado) {
      return new HttpException(`Interesado con ID ${createSolicitudintDto.idInteresado} no encontrado`, HttpStatus.NOT_FOUND);
    }

    const programaFormativo = await this.programaFormativoRepository.findOne({
      where: { idPrograma: createSolicitudintDto.idProgramaFormativo },
    });

    if (!programaFormativo) {
      return new HttpException(`Programa formativo con ID ${createSolicitudintDto.idProgramaFormativo} no encontrado`, HttpStatus.NOT_FOUND);
    }


    const solicitud = this.solicitudintRepository.create({
      ...createSolicitudintDto,
      interesado: interesado,
      programaFormativo: programaFormativo,
    });

    return this.solicitudintRepository.save(solicitud);
  }

  async findAll(): Promise<Solicitudint[] | any> {
    const solicitudes = await this.solicitudintRepository.find();

    if (solicitudes.length === 0) {
      return new HttpException('No se encontraron solicitudes', HttpStatus.NOT_FOUND);
    }

    return solicitudes;
  }

  async findOne(id: number): Promise<Solicitudint | any> {
    const solicitud = await this.solicitudintRepository.findOne({
        where: { idSolicitud: id }
      });

    if (!solicitud) {
      return new HttpException(`Solicitud con ID ${id} no encontrada`, HttpStatus.NOT_FOUND);
    }
    return solicitud;
  }

  async update(id: number, updateSolicitudintDto: UpdateSolicitudintDto): Promise<Solicitudint | any> {
    const solicitud = await this.solicitudintRepository.findOne({
      where: { idSolicitud: id }
    });
    if (!solicitud) {
      return new HttpException(`Solicitud con ID ${id} no encontrada`, HttpStatus.NOT_FOUND);
    }
    
    if (updateSolicitudintDto.documentoSolicitado) {
      solicitud.documentoSolicitado = updateSolicitudintDto.documentoSolicitado;
    }
    if (updateSolicitudintDto.estadoTramite) {
      solicitud.estadoTramite = updateSolicitudintDto.estadoTramite;
    }
    if (updateSolicitudintDto.observacionSolicitud) {
      solicitud.observacionSolicitud = updateSolicitudintDto.observacionSolicitud;
    }
    if (updateSolicitudintDto.fechaSolicitudEgresado) {
      solicitud.fechaSolicitudEgresado = updateSolicitudintDto.fechaSolicitudEgresado;
    }

    return this.solicitudintRepository.save(solicitud);
  }

  async remove(id: number): Promise<any> {
    const result = await this.solicitudintRepository.delete({ idSolicitud: id });
    if (result.affected === 0) {  
     return new HttpException(`Solicitud con ID ${id} no encontrada`, HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
