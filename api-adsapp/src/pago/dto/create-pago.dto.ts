import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePagoDto {
    @IsNotEmpty()
    idSolicitudint: number;

    @IsNumber()
    @IsNotEmpty()
    montoPago: number;

    @IsDate()
    @IsNotEmpty()
    fechaPago: Date;

    @IsString()
    @IsNotEmpty()
    medioPago: string;

    @IsString()
    @IsNotEmpty()
    codigoTransaccionPago: string;
}
