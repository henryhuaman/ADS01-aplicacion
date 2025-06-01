import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}
  async create(createCursoDto: CreateCursoDto): Promise<Curso | any> {
    const exists = await this.cursoRepository.findOne({
      where: { nombreCurso: createCursoDto.nombreCurso }
    });

    if (exists) {
      return new HttpException(
        `Curso con nombre ${createCursoDto.nombreCurso} ya existe`,
        HttpStatus.CONFLICT
      );
    }
    const curso = this.cursoRepository.create(createCursoDto);
    return this.cursoRepository.save(createCursoDto);
  }

  async findAll(): Promise<Curso[] | any> {
    const cursos = await this.cursoRepository.find();
    if (cursos.length === 0) {
      return new HttpException('No se encontraron cursos', HttpStatus.NOT_FOUND);
    }
    return cursos;
  }

  async findOne(idCurso: number): Promise<Curso | any> {
    const curso = await this.cursoRepository.findOne({
      where: { idCurso: idCurso }
    });

    if (!curso) {
      return new HttpException(
        `Curso con ID ${idCurso} no encontrado`,
        HttpStatus.NOT_FOUND)
    }
    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso | any> {
    const curso = await this.findOne(id);

    if (!curso) {
        return new HttpException(
          `Curso con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
      }

    if (updateCursoDto.nombreCurso && updateCursoDto.nombreCurso !== curso.nombreCurso) {
      const exists = await this.cursoRepository.findOne({
        where: { nombreCurso: updateCursoDto.nombreCurso }
      });

      if (exists) {
        return new HttpException(
          `Curso con nombre ${updateCursoDto.nombreCurso} ya existe`, HttpStatus.CONFLICT );
      }
    }
    
    const updatedCurso = this.cursoRepository.merge(curso, updateCursoDto);
    return this.cursoRepository.save(updatedCurso);
  }

  async remove(id: number): Promise<any> {
    const result = await this.cursoRepository.delete(id);
    if (result.affected === 0) {
     return new HttpException(`Curso con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  
}
