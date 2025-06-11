import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { Repository } from 'typeorm';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepository: Repository<Evaluacion>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
  ) {}

  async create(createDto: CreateEvaluacionDto): Promise<Evaluacion | any> {

    const estudiante = await this.estudianteRepository.findOneBy({ 
      idEstudiante: createDto.idEstudiante 
    });
    if (!estudiante) {
      return new HttpException(`Estudiante con ID ${createDto.idEstudiante} no encontrado`, HttpStatus.NOT_FOUND);
    }

    const curso = await this.cursoRepository.findOneBy({ 
      idCurso: createDto.idCurso 
    });
    if (!curso) {
      return new HttpException(`Curso con ID ${createDto.idCurso} no encontrado`, HttpStatus.NOT_FOUND);
    }

    const profesor = await this.profesorRepository.findOneBy({ 
      idProfesor: createDto.idProfesor 
    });

    if (!profesor) {
      return new HttpException(`Profesor con ID ${createDto.idProfesor} no encontrado`, HttpStatus.NOT_FOUND);
    }


    const evaluacion = this.evaluacionRepository.create({
      notaEvaluacion: createDto.notaEvaluacion,
      tipoEvaluacion: createDto.tipoEvaluacion,
      estudiante,
      curso,
      profesor,
    });

    return this.evaluacionRepository.save(evaluacion);
  }

  async findAll(): Promise<Evaluacion[] | any> {
    const evaluaciones = await this.evaluacionRepository.find({
      relations: ['estudiante', 'curso'],
    });

    if (evaluaciones.length === 0) {
      return new HttpException('No se encontraron evaluaciones', HttpStatus.NOT_FOUND);
    }

    return evaluaciones;
  }

  async findOne(id: number): Promise<Evaluacion | any> {
    const evaluacion = await this.evaluacionRepository.findOne({
      where: { idEvaluacion: id },
      relations: ['estudiante', 'curso'],
    });

    if (!evaluacion) {
      return new HttpException('Evaluación no encontrada', HttpStatus.NOT_FOUND);
    }
    return evaluacion;
  }

  async findByEstudiante(idEstudiante: number): Promise<Evaluacion[] | any> {
    const evaluaciones = await this.evaluacionRepository.find({
      where: { estudiante: { idEstudiante } },
    });
    if (evaluaciones.length === 0) {
      return new HttpException('No se encontraron evaluaciones para este estudiante', HttpStatus.NOT_FOUND);
    }
    return evaluaciones;
  }

  async update(id: number, updateEvaluacionDto: UpdateEvaluacionDto): Promise<Evaluacion | any> {
    const found = await this.evaluacionRepository.findOne({
      where: { idEvaluacion: id },
    });
    if (!found) {
      return new HttpException('Evaluación no encontrada', HttpStatus.NOT_FOUND);
    }

    if (updateEvaluacionDto.notaEvaluacion !== undefined) {
      found.notaEvaluacion = updateEvaluacionDto.notaEvaluacion;
    }
    if (updateEvaluacionDto.tipoEvaluacion) {
      found.tipoEvaluacion = updateEvaluacionDto.tipoEvaluacion;
    }

    return this.evaluacionRepository.save(found);
  }

  async remove(id: number): Promise<any> {
    const result = await this.evaluacionRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Evaluación no encontrada', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
