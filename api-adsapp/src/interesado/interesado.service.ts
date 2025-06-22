import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInteresadoDto } from './dto/create-interesado.dto';
import { UpdateInteresadoDto } from './dto/update-interesado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interesado } from './entities/interesado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InteresadoService {

  constructor(@InjectRepository(Interesado) private readonly interesadoRepository: Repository<Interesado>) {}

  async create(createInteresadoDto: CreateInteresadoDto): Promise<Interesado | any> {
    const exists = await this.interesadoRepository.findOne({
      where: [
        { dniInteresado: createInteresadoDto.dniInteresado },
        { correoInteresado: createInteresadoDto.correoInteresado }
      ],

    })

    if (exists) {
      return new HttpException('El interesado ya existe', HttpStatus.CONFLICT);
    }

    const newInteresado = this.interesadoRepository.create({
      ...createInteresadoDto
    })

    return this.interesadoRepository.save(createInteresadoDto);

  }

  async findAll(): Promise<Interesado[] |any> {
    const interesados = await this.interesadoRepository.find();

    if(interesados.length === 0) {
      return new HttpException('No se encontraron interesados', HttpStatus.NOT_FOUND);
    }
    return interesados;
  }

  async findOne(id: number): Promise<Interesado | any> {
    const interesado = await this. interesadoRepository.findOne({
      where: {idInteresado: id}
    })

    if (!interesado) {
      return new HttpException('Interesado no encontrado', HttpStatus.NOT_FOUND);
    }

    return interesado;
  }

  async update(id: number, updateInteresadoDto: UpdateInteresadoDto): Promise<Interesado | any>  {
    const found = await this.interesadoRepository.findOne({
      where: { idInteresado: id }
    })

    if (!found) {
      return new HttpException('Interesado no encontrado', HttpStatus.NOT_FOUND);
    }

    this.interesadoRepository.merge(found, updateInteresadoDto);
    return this.interesadoRepository.save(found);
  }

  
  async remove(id: number): Promise<any> {
    const result = await this.interesadoRepository.delete(id);
    if (result.affected === 0) {
      return new HttpException('Interesado no encontrado', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findByCredentials(correo: string, contraseña: string): Promise<Interesado | null> {
    return this.interesadoRepository.findOne({
      where: { correoInteresado: correo, contraseñaInteresado: contraseña },
      select: ['idInteresado', 'nombreInteresado', 'apellidoInteresado', 'dniInteresado', 'correoInteresado', 'telefonoInteresado'] // Añade campos necesarios
    });
  }
}
