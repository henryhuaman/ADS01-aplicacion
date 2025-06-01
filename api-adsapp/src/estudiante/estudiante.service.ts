import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class EstudianteService {

  constructor(@InjectRepository(Estudiante) private readonly estudianteRepository: Repository<Estudiante>) {}

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante | any> {
    const exists = await this.estudianteRepository.findOne({
      where: [
        { dniEstudiante: createEstudianteDto.dniEstudiante },
        { correoEstudiante: createEstudianteDto.correoEstudiante }
      ],

    })

    if (exists) {
      return new HttpException('El estudiante ya existe', HttpStatus.CONFLICT);
    }

    const newEstudiante = this.estudianteRepository.create({
      ...createEstudianteDto
    })

    return this.estudianteRepository.save(newEstudiante);

  }

  async findAll(): Promise<Estudiante[] | any> {
    const estudiantes = await this.estudianteRepository.find();

    if(estudiantes.length === 0) {
      return new HttpException('No se encontraron estudiantes', HttpStatus.NOT_FOUND);
    }
    return estudiantes;
  }

  async findOne(id: number): Promise<Estudiante | any> {
    const estudiante = await this. estudianteRepository.findOne({
      where: {idEstudiante: id}
    })

    if (!estudiante) {
      return new HttpException('Estudiante no encontrado', HttpStatus.NOT_FOUND);
    }

    return estudiante;
  }

  async findByEmail(correo: string): Promise<Estudiante | any> {
    const estEmail= await this.estudianteRepository.findOneBy({ correoEstudiante: correo })

    if (!estEmail) {
      return new HttpException('email no encontrado', HttpStatus.NOT_FOUND);
    }
    return estEmail;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto): Promise<Estudiante | any>  {
    const found = await this.estudianteRepository.findOne({
      where: { idEstudiante: id }
    })

    if (!found) {
      return new HttpException('Estudiante no encontrado', HttpStatus.NOT_FOUND);
    }

    const exists = await this.estudianteRepository.findOne({
        where: [
          {correoEstudiante: updateEstudianteDto.correoEstudiante}
        ]
      });

      if (exists && exists.idEstudiante !== id) {
        return new HttpException('Correo ya registrado por otro estudiante', HttpStatus.CONFLICT);
      }
    

    this.estudianteRepository.merge(found, updateEstudianteDto);
    return this.estudianteRepository.save(found);
  }
  
  async remove(id: number): Promise<any> {
    const result = await this.estudianteRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Estudiante no encontrado', HttpStatus.NOT_FOUND);
    }

    return result;
  }


}
