import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDiaHoraDto } from './dto/create-dia-hora.dto';
import { UpdateDiaHoraDto } from './dto/update-dia-hora.dto';
import { DiaHora } from './entities/dia-hora.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { Bloque } from 'src/bloque/entities/bloque.entity';

@Injectable()
export class DiaHoraService {

  constructor(
    @InjectRepository(DiaHora)
    private readonly diaHoraRepository: Repository<DiaHora>,
    private readonly bloqueRepository: Repository<Bloque>
  ) {}

  async create(createDiaHoraDto: CreateDiaHoraDto): Promise<DiaHora | any> {

    const bloque = await this.bloqueRepository.findOneBy({ idBloque: createDiaHoraDto.idBloque });
    if (!bloque) {
      return new HttpException('Bloque no encontrado', HttpStatus.NOT_FOUND);
    }


    const existeHorario = await this.diaHoraRepository.findOne({
      where: [
        {
          dia: createDiaHoraDto.dia,
          bloque: { profesor: { idProfesor: bloque.profesor.idProfesor } },
          horaInicio: LessThanOrEqual(createDiaHoraDto.horaInicio),
          horaFin: MoreThan(createDiaHoraDto.horaInicio),
        },
        {
          dia: createDiaHoraDto.dia,
          bloque: { profesor: { idProfesor: bloque.profesor.idProfesor } },
          horaInicio: LessThan(createDiaHoraDto.horaFin),
          horaFin: MoreThanOrEqual(createDiaHoraDto.horaFin),
        },
        {
          dia: createDiaHoraDto.dia,
          bloque: { profesor: { idProfesor: bloque.profesor.idProfesor } },
          horaInicio: MoreThanOrEqual(createDiaHoraDto.horaInicio),
          horaFin: LessThanOrEqual(createDiaHoraDto.horaFin),
        },
      ]
    });
  

    if (existeHorario) {
      return new HttpException(
        `Ya existe un horario para el profesor ${bloque.profesor.idProfesor} en la fecha ${createDiaHoraDto.dia} 
        entre las horas ${createDiaHoraDto.horaInicio} y ${createDiaHoraDto.horaFin}`,
        HttpStatus.CONFLICT
      );
    }

    const diaHora = this.diaHoraRepository.create({
      dia: createDiaHoraDto.dia,
      horaInicio: createDiaHoraDto.horaInicio,
      horaFin: createDiaHoraDto.horaFin,
      bloque
    });

    return this.diaHoraRepository.save(diaHora);
  }

  async findAll(): Promise<DiaHora | any> {
    const diasHoras = await this.diaHoraRepository.find({
      relations: ['bloque']
    });
    if (diasHoras.length ===0) {
      return new HttpException('No se encontraron horarios', HttpStatus.NOT_FOUND);
    }
    return diasHoras;
  }

  async findOne(id: number): Promise<DiaHora | any> {
    const diaHora = await this.diaHoraRepository.findOne({
      where: { idDiaHora: id },
      relations: ['bloque'],
    });

    if (!diaHora) {
      return new HttpException('Horario no encontrado', HttpStatus.NOT_FOUND);
    }

    return diaHora;
  }

  async findByBloque(idBloque: number): Promise<DiaHora[] | any> {
    const diaHoras = await this.diaHoraRepository.find({
      where: { bloque: { idBloque } },
      order: { dia: 'ASC', horaInicio: 'ASC' },
    });

    if (diaHoras.length === 0) {
      return new HttpException(
        `No se encontraron horarios para el bloque con ID ${idBloque}`, HttpStatus.NOT_FOUND);
    }

    return diaHoras;
  }



  async update(id: number, updateDiaHoraDto: UpdateDiaHoraDto): Promise<DiaHora | any> {
    const diaHora = await this.findOne(id);
    if (diaHora instanceof HttpException) {
      return diaHora;
    }

    if (!updateDiaHoraDto.dia || !updateDiaHoraDto.horaInicio || !updateDiaHoraDto.horaFin) {
      return new HttpException('Datos incompletos para actualizar el horario', HttpStatus.BAD_REQUEST);
    }


    const existeHorario = await this.diaHoraRepository.findOne({
      where: [
        {
          idDiaHora: Not(id),
          dia: updateDiaHoraDto.dia,
          bloque: { profesor: { idProfesor: diaHora.bloque.profesor.idProfesor } },
          horaInicio: LessThanOrEqual(updateDiaHoraDto.horaInicio),
          horaFin: MoreThan(updateDiaHoraDto.horaInicio),
        },
        {
          idDiaHora: Not(id),
          dia: updateDiaHoraDto.dia,
          bloque: { profesor: { idProfesor: diaHora.bloque.profesor.idProfesor } },
          horaInicio: LessThan(updateDiaHoraDto.horaFin),
          horaFin: MoreThanOrEqual(updateDiaHoraDto.horaFin),
        },
        {
          idDiaHora: Not(id),
          dia: updateDiaHoraDto.dia,
          bloque: { profesor: { idProfesor: diaHora.bloque.profesor.idProfesor } },
          horaInicio: MoreThanOrEqual(updateDiaHoraDto.horaInicio),
          horaFin: LessThanOrEqual(updateDiaHoraDto.horaFin),
        },
      ],
      relations: ['bloque.profesor']
    });
    if (existeHorario) {
      return new HttpException(
        `Ya existe un horario para el profesor ${diaHora.bloque.profesor.idProfesor} en la fecha ${updateDiaHoraDto.dia} 
        entre las horas ${updateDiaHoraDto.horaInicio} y ${updateDiaHoraDto.horaFin}`,
        HttpStatus.CONFLICT
      );
    }

    diaHora.dia = updateDiaHoraDto.dia;
    diaHora.horaInicio = updateDiaHoraDto.horaInicio;
    diaHora.horaFin = updateDiaHoraDto.horaFin;

    return this.diaHoraRepository.save(diaHora);
  }

  async remove(id: number): Promise<any> {
    const result = await this.diaHoraRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException(
        `Horario con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
