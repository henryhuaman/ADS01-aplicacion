import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoEstudianteDto } from './dto/create-curso-estudiante.dto';
import { UpdateCursoEstudianteDto } from './dto/update-curso-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CursoEstudiante } from './entities/curso-estudiante.entity';
import { Repository } from 'typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Injectable()
export class CursoEstudianteService {
  constructor(
    @InjectRepository(CursoEstudiante)
    private readonly cursoEstudianteRepository: Repository<CursoEstudiante>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
  ) {}

  async create(createCursoEstudianteDto: CreateCursoEstudianteDto): Promise<CreateCursoEstudianteDto | any> {
    const estudiante = await this.estudianteRepository.findOneBy({ 
      idEstudiante: createCursoEstudianteDto.idEstudiante 
    });
    if (!estudiante) {
      return new HttpException(
        `Estudiante con ID ${createCursoEstudianteDto.idEstudiante} no encontrado`, HttpStatus.NOT_FOUND)
    }

    const curso = await this.cursoRepository.findOneBy({ 
      idCurso: createCursoEstudianteDto.idCurso 
    });
    if (!curso) {
      return new HttpException(
        `Curso con ID ${createCursoEstudianteDto.idCurso} no encontrado`, HttpStatus.NOT_FOUND)
    }

    // Verificar si ya existe la relación
    const exists = await this.cursoEstudianteRepository.findOne({
      where: {
        idCurso: createCursoEstudianteDto.idCurso,
        idEstudiante: createCursoEstudianteDto.idEstudiante
      }
    });

    if (exists) {
      return new HttpException(
        `La relación entre el curso ${createCursoEstudianteDto.idCurso} y el estudiante
         ${createCursoEstudianteDto.idEstudiante} ya existe`, HttpStatus.CONFLICT)
    }

    const matricula = this.cursoEstudianteRepository.create({
      idCurso: createCursoEstudianteDto.idCurso,
      idEstudiante: createCursoEstudianteDto.idEstudiante,
      fechaFin: createCursoEstudianteDto.fechaFin,
      curso,
      estudiante
    });

    return this.cursoEstudianteRepository.save(matricula);
  }

  async findAll() {
    const matriculas = await this.cursoEstudianteRepository.find({
      relations: ['curso', 'estudiante']
    });

    if (matriculas.length === 0) {
      return new HttpException('No se encontraron matrículas', HttpStatus.NOT_FOUND);
    }

    return matriculas;
  }

  async findOne(idCurso: number, idEstudiante: number): Promise<CursoEstudiante | any> {
    const matricula = await this.cursoEstudianteRepository.findOne({
      where: {
        idCurso,
        idEstudiante
      },
      relations: ['curso', 'estudiante']
    })

    if (!matricula) {
      return new HttpException(
        `Matrícula con curso ID ${idCurso} y estudiante ID ${idEstudiante} no encontrada`, 
        HttpStatus.NOT_FOUND
      );
    }
    return matricula;
  }

  async findByEstudiante(idEstudiante: number): Promise<CursoEstudiante[] | any> {
    const exists = await this.cursoEstudianteRepository.find({
      where: { idEstudiante },
      relations: ['curso']
    });

  if (exists.length === 0) {
      return new HttpException(
        `No se encontraron matrículas para el estudiante con ID ${idEstudiante}`, 
        HttpStatus.NOT_FOUND
      );
    }
    return exists;
  }

  async findByCurso(idCurso: number): Promise<CursoEstudiante[] | any> {
    const exists = await this.cursoEstudianteRepository.find({
      where: { idCurso },
      relations: ['estudiante']
    });

    if (exists.length === 0) {
      return new HttpException(
        `No se encontraron matrículas para el estudiante con ID ${idCurso}`, 
        HttpStatus.NOT_FOUND
      );
    }
    return exists
  }

  async update(idCurso: number, idEstudiante: number, updateCursoEstudianteDto: UpdateCursoEstudianteDto): Promise<CursoEstudiante | any> {
    const exists = await this.cursoEstudianteRepository.findOne({
      where: {
        idCurso,
        idEstudiante
      }
    });

    if(!exists) {
      return new HttpException(
        `Matrícula con curso ID ${idCurso} y estudiante ID ${idEstudiante} no encontrada`, 
        HttpStatus.NOT_FOUND
      );
    }

    if (updateCursoEstudianteDto.fechaFin) {
      exists.fechaFin = exists.fechaFin;
    }

    return this.cursoEstudianteRepository.save(exists);
  }

  async remove(idCurso: number, idEstudiante: number): Promise<any> {
    const result = await this.cursoEstudianteRepository.delete({
      idCurso,
      idEstudiante
    });

    if (result.affected === 0) {
      return new HttpException(
        `Matrícula con curso ID ${idCurso} y estudiante ID ${idEstudiante} no encontrada`,
        HttpStatus.NOT_FOUND
      )
    }

    return result;
  }

}
