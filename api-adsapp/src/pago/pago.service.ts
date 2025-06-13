import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { Solicitudint } from 'src/solicitudint/entities/solicitudint.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
    @InjectRepository(Solicitudint)
    private solicitudintRepository: Repository<Solicitudint>,
  ) {}
  async create(createPagoDto: CreatePagoDto): Promise<Pago  | any> {

    const solicitudint = await this.solicitudintRepository.findOne({
      where: { idSolicitud: createPagoDto.idSolicitudint },
    });
    if (!solicitudint) {
      return new HttpException(
        `Solicitud con ID ${createPagoDto.idSolicitudint} no encontrada`, HttpStatus.NOT_FOUND);
    }

    const existingCodigoTransaccion = await this.pagoRepository.findOne({
      where: { codigoTransaccionPago: createPagoDto.codigoTransaccionPago },
    });

    if (existingCodigoTransaccion) {
      return new HttpException(
        `El código de transacción ${createPagoDto.codigoTransaccionPago} ya está en uso`, HttpStatus.CONFLICT);
    }

    const pago = this.pagoRepository.create({
      ...createPagoDto,
      solicitudint: solicitudint,
    });

    return this.pagoRepository.save(pago);
  }


  async findAll(): Promise<Pago[] | any> {
    const pagos = await this.pagoRepository.find();

    if (pagos.length === 0) {
      return new HttpException('No se encontraron pagos', HttpStatus.NOT_FOUND);
    }
    return pagos;
  }

  async findOne(id: number): Promise<Pago | any> {
    const pago = await this.pagoRepository.findOne({
      where: { idPago: id }
    });

    if (!pago) {
      return new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
    }
    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago | any> {
    const pago = await this.pagoRepository.findOne({
      where: { idPago: id }
    });
    if (!pago) {
      return new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
    }
    
    const existingCodigoTransaccion = await this.pagoRepository.findOne({
      where: { codigoTransaccionPago: updatePagoDto.codigoTransaccionPago },
    });
    if (existingCodigoTransaccion && existingCodigoTransaccion.idPago !== id) {
      return new HttpException(
        `El código de transacción ${updatePagoDto.codigoTransaccionPago} ya está en uso`, HttpStatus.CONFLICT);
    }
    this.pagoRepository.merge(pago, updatePagoDto);
    return this.pagoRepository.save(pago);
  }

  async remove(id: number): Promise<any> {
    const result = await this.pagoRepository.findOne({
      where: { idPago: id }
    });
    if (!result) {
      return new HttpException('Pago no encontrado', HttpStatus.NOT_FOUND);
    }
    await result;
  }
}
