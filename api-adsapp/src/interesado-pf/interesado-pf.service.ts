import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInteresadoPfDto } from './dto/create-interesado-pf.dto';
import { UpdateInteresadoPfDto } from './dto/update-interesado-pf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InteresadoPf } from './entities/interesado-pf.entity';
import { Repository } from 'typeorm';
import { Interesado } from 'src/interesado/entities/interesado.entity';
import { ProgramaFormativo } from 'src/programa-formativo/entities/programa-formativo.entity';

@Injectable()
export class InteresadoPfService {
  constructor(
    @InjectRepository(InteresadoPf)
    private interesadoPfRepository: Repository<InteresadoPf>,
    @InjectRepository(Interesado)
    private interesadoRepository: Repository<Interesado>,
    @InjectRepository(ProgramaFormativo)
    private programaFormativoRepository: Repository<ProgramaFormativo>,
  ) {}

  async create(createInteresadoPfDto: CreateInteresadoPfDto): Promise<InteresadoPf | any> {

    const programa = await this.programaFormativoRepository.findOne(
      { where: { idPrograma: createInteresadoPfDto.idPrograma } }
    );

    if (!programa) {
      return new HttpException(
        `Programa Formativo con ID ${createInteresadoPfDto.idPrograma} no encontrado`, HttpStatus.NOT_FOUND);
    }

    const interesado = await this.interesadoRepository.findOne(
      { where: { idInteresado: createInteresadoPfDto.idInteresado } }
    );
    if (!interesado) {
      return new HttpException(
        `Interesado con ID ${createInteresadoPfDto.idInteresado} no encontrado`, HttpStatus.NOT_FOUND);
    }

    const interesadoPf = this.interesadoPfRepository.create({
      fechaInicio: createInteresadoPfDto.fechaInicio,
      fechaFin: createInteresadoPfDto.fechaFin,
      programa,
      interesado
    });
    
    return this.interesadoPfRepository.save(interesadoPf);
  }

  async findAll(): Promise<InteresadoPf[] | any> {
    const relaciones = await this.interesadoPfRepository.find({
      relations: ['programa', 'interesado'], // Incluir relaciones
    });
    if (relaciones.length === 0) {
      return new HttpException(
        'No se encontraron relaciones entre interesados y programas formativos', 
        HttpStatus.NOT_FOUND
      );
    }

    return relaciones;
  }

  async findOne(id: number): Promise<InteresadoPf | any> {
    const interesadoPf = await this.interesadoPfRepository.findOne({
      where: { idMatricula: id },
      relations: ['programa', 'interesado'] // Incluir relaciones
    });

    if (!interesadoPf) {
      return new HttpException(
        `No se encontró la relación con ID ${id}`, HttpStatus.NOT_FOUND
      );
    }

    return interesadoPf;
  }

   async update(id: number, updateInteresadoPfDto: UpdateInteresadoPfDto): Promise<InteresadoPf | any> {
    const interesadoPf = await this.interesadoPfRepository.findOne({
      where: { idMatricula: id },
      relations: ['programa', 'interesado'] // Incluir relaciones
    });
    if (!interesadoPf) {
      return new HttpException(
        `No se encontró la relación con ID ${id}`, HttpStatus.NOT_FOUND
      );
    }
    
    return this.interesadoPfRepository.save(interesadoPf);
  }

  async remove(id: number): Promise<any> {
    const result = await this.interesadoPfRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException(
        `No se encontró la relación con ID ${id}`, HttpStatus.NOT_FOUND
      );
    }
    return result;
  }

  async findByInteresado(idInteresado: number): Promise<any> {
    const relaciones = await this.interesadoPfRepository.find({
      where: { interesado: { idInteresado } },
      relations: ['programa'], // Solo necesitas cargar los programas
    });

    if (!relaciones || relaciones.length === 0) {
      return new HttpException(
        `No se encontraron programas para el interesado con ID ${idInteresado}`,
        HttpStatus.NOT_FOUND
      );
    }

    // Retornar solo los programas
    return relaciones.map((rel) => rel.programa);
  }
}
