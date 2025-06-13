import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoDto } from './create-pago.dto';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {
    @IsOptional()
    @IsNumber()
    montoPago?: number;

    @IsOptional()
    @IsDate()
    fechaPago?: Date;

    @IsOptional()
    @IsString()
    medioPago?: string;

    @IsOptional()
    @IsString()
    codigoTransaccionPago?: string;
}
