import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}
  async create(createProfesorDto: CreateProfesorDto): Promise<Profesor | any> {
    const exists = await this.profesorRepository.findOne({
      where: {
        correoProfesor: createProfesorDto.correoProfesor
      }
    })

    if (exists) {
      return new HttpException(
        `Profesor con correo ${createProfesorDto.correoProfesor} ya existe`, HttpStatus.CONFLICT);
    }
    const newProfesor = this.profesorRepository.create({
      ...createProfesorDto
    });
    return this.profesorRepository.save(newProfesor);
  }

  async findAll(): Promise<Profesor[] | any> {
    const profesores = await this.profesorRepository.find({
      relations: ['bloques'],
    });

    if (profesores.length === 0) {
      throw new HttpException('No se encontraron profesores', HttpStatus.NOT_FOUND);
    }

    return profesores;
  }

  async findOne(id: number): Promise<Profesor | any> {
    const profesor = await this.profesorRepository.findOne({
      where: { idProfesor: id },
      relations: ['bloques'],
    });

    if (!profesor) {
      return new HttpException('Profesor no encontrado', HttpStatus.NOT_FOUND);
    }
    return profesor;
  }

  async findByEmail(correo: string): Promise<Profesor | any> {
    const profesorEmail = await this.profesorRepository.findOne({
      where: { correoProfesor: correo },
    });

    if (!profesorEmail) {
      return new HttpException('Email no encontrado', HttpStatus.NOT_FOUND);
    }
    return profesorEmail;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto): Promise<Profesor | any> {
    const profesor = await this.findOne(id);

    if (!profesor) {
      return new HttpException('Profesor no encontrado', HttpStatus.NOT_FOUND);
    }

    if (updateProfesorDto.correoProfesor && updateProfesorDto.correoProfesor !== profesor.correoProfesor) {
      const exists = await this.profesorRepository.findOne({
        where: { correoProfesor: updateProfesorDto.correoProfesor }
      });

      if (exists) {
        return new HttpException(
          `Profesor con correo ${updateProfesorDto.correoProfesor} ya existe`, HttpStatus.CONFLICT);
      }
    }

    this.profesorRepository.merge(profesor, updateProfesorDto);
    return this.profesorRepository.save(profesor);
  }

  async remove(id: number): Promise<any> {
    const result = await this.profesorRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Profesor no encontrado', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
