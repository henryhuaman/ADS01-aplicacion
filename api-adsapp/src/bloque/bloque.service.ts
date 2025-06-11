import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBloqueDto } from './dto/create-bloque.dto';
import { UpdateBloqueDto } from './dto/update-bloque.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bloque } from './entities/bloque.entity';
import { Between, Repository } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Injectable()
export class BloqueService {

  constructor(
    @InjectRepository(Bloque)
    private readonly bloqueRepository: Repository<Bloque>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  async create(createBloqueDto: CreateBloqueDto): Promise<Bloque | any> {
    const curso = await this.cursoRepository.findOneBy({ idCurso: createBloqueDto.idCurso });
    if (!curso) {
      return new HttpException('Curso no encontrado', HttpStatus.NOT_FOUND);
    }

    const profesor = await this.profesorRepository.findOneBy({ idProfesor: createBloqueDto.idProfesor });
    if (!profesor) {
      return new HttpException('Profesor no encontrado', HttpStatus.NOT_FOUND);
    }
    /*
    const existeBloque = await this.bloqueRepository.findOne({
    where: {
      curso: { idCurso: createBloqueDto.idCurso },
      fechaInicio: Between(createBloqueDto.fechaInicio, createBloqueDto.fechaFin)
    }
  });
  

    if (existeBloque) {
      return new HttpException(
        `Ya existe un bloque para el curso ${createBloqueDto.idCurso} en el rango de fechas especificado`, HttpStatus.CONFLICT)
    }
    */
   
    const bloque = this.bloqueRepository.create({
      fechaInicio: createBloqueDto.fechaInicio,
      fechaFin: createBloqueDto.fechaFin,
      curso,
      profesor
    });

    return this.bloqueRepository.save(bloque);
  }

  async findAll(): Promise<Bloque[] | any> {
    const bloques = await this.bloqueRepository.find({
      relations: ['curso', 'profesor'],
    });

    if (bloques.length === 0) {
      return new HttpException('No se encontraron bloques', HttpStatus.NOT_FOUND);
    }
    return bloques;
  }

  async findOne(id: number): Promise<Bloque | any> {
    const bloque = await this.bloqueRepository.findOne({
      where: { idBloque: id },
      relations: ['curso', 'profesor'],
    });
    if (!bloque) {
      return new HttpException('Bloque no encontrado', HttpStatus.NOT_FOUND);
    }

    return bloque;
  }

  async findByCurso(idCurso: number): Promise<Bloque[] | any> {
    const exists = await this.bloqueRepository.find({
      where: { curso: { idCurso } },
      relations: ['profesor'],
    });

    if (exists.length === 0) {
      return new HttpException(
        `No se encontraron bloques para el curso con ID ${idCurso}`, HttpStatus.NOT_FOUND);
    }
    return exists;
  }

  async findByProfesor(idProfesor: number): Promise<Bloque[] | any> {
    const exists = await this.bloqueRepository.find({
      where: { profesor: { idProfesor } },
      relations: ['curso'],
    });

    if (exists.length === 0) {
      return new HttpException(
        `No se encontraron bloques para el profesor con ID ${idProfesor}`, HttpStatus.NOT_FOUND);
    }
    return exists;
  }

  async update(id: number, updateBloqueDto: UpdateBloqueDto): Promise<Bloque[] | any> {
    const bloque = await this.findOne(id);
    if (!bloque) {
      return new HttpException('Bloque no encontrado', HttpStatus.NOT_FOUND);
    }

    if (updateBloqueDto.idCurso) {
      const curso = await this.cursoRepository.findOneBy({ idCurso: updateBloqueDto.idCurso });
      if (!curso) {
        return new HttpException('Curso no encontrado', HttpStatus.NOT_FOUND);
      }
      bloque.curso = curso;
    }

    if (updateBloqueDto.idProfesor) {
      const profesor = await this.profesorRepository.findOneBy({ idProfesor: updateBloqueDto.idProfesor });
      if (!profesor) {
        return new HttpException('Profesor no encontrado', HttpStatus.NOT_FOUND);
      }
      bloque.profesor = profesor;
    }

    if (updateBloqueDto.fechaInicio) bloque.fechaInicio = updateBloqueDto.fechaInicio;
    if (updateBloqueDto.fechaFin) bloque.fechaFin = updateBloqueDto.fechaFin;

    return this.bloqueRepository.save(bloque);
  }

  async remove(id: number): Promise<any> {
    const result = await this.bloqueRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException(
        `Bloque con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
