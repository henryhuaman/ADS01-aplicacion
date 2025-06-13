import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProgramaFormativoDto } from './dto/create-programa-formativo.dto';
import { UpdateProgramaFormativoDto } from './dto/update-programa-formativo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramaFormativo } from './entities/programa-formativo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramaFormativoService {

  constructor(
    @InjectRepository(ProgramaFormativo)
    private programaFormativoRepository: Repository<ProgramaFormativo>,
  ) {}

  async create(createProgramaFormativoDto: CreateProgramaFormativoDto): Promise<ProgramaFormativo | any> {
    const existingPrograma = await this.programaFormativoRepository.findOne({
      where: { nombrePrograma: createProgramaFormativoDto.nombrePrograma }
    });

    if (existingPrograma) {
      return new HttpException(
        `Programa formativo con nombre ${createProgramaFormativoDto.nombrePrograma} ya existe`, HttpStatus.CONFLICT);
    }


    const programa = this.programaFormativoRepository.create({
      nombrePrograma: createProgramaFormativoDto.nombrePrograma,
      descripcion: createProgramaFormativoDto.descripcion
    });
    return this.programaFormativoRepository.save(programa);
  }

  async findAll(): Promise<ProgramaFormativo[] | any> {
    const programas = await this.programaFormativoRepository.find();

    if (programas.length === 0) {
      return new HttpException(
        'No se encontraron programas formativos', HttpStatus.NOT_FOUND);
    }

    return programas;
  }

  async findOne(id: number): Promise<ProgramaFormativo | any> {
    const programa = await this.programaFormativoRepository.findOne({
      where: { idPrograma: id }
    });

    if (!programa) {
      return new HttpException(
        `Programa formativo con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    return programa;
  }

  async update(id: number, updateProgramaFormativoDto: UpdateProgramaFormativoDto): Promise<ProgramaFormativo | any> {
    const programa = await this.programaFormativoRepository.findOne({
      where: { idPrograma: id }
    });

    if (!programa) {
      return new HttpException(
        `Programa formativo con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }

    if( updateProgramaFormativoDto.nombrePrograma) {
      programa.nombrePrograma = updateProgramaFormativoDto.nombrePrograma;
      };
    if( updateProgramaFormativoDto.descripcion) {
      programa.descripcion = updateProgramaFormativoDto.descripcion;
    }

    return this.programaFormativoRepository.save(programa);
  }

  async remove(id: number): Promise<any> {
    const result = await this.programaFormativoRepository.delete({
      idPrograma: id
    });

    if (result.affected === 0) {
      return new HttpException(
        `Programa formativo con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
