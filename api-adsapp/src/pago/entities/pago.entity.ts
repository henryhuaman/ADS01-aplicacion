import { Interesado } from "src/interesado/entities/interesado.entity";
import { Solicitudint } from "src/solicitudint/entities/solicitudint.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pago')
export class Pago {
    @PrimaryGeneratedColumn()
    idPago: number;

    @OneToOne(() => Solicitudint)
    @JoinColumn({ name: 'idSolicitudint' })
    solicitudint: Solicitudint;

     @Column()
     montoPago: number;

     @Column({ type: 'timestamptz' })
     fechaPago: Date;

     @Column()
     medioPago: String;

     @Column({ unique: true})
     codigoTransaccionPago: String;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

}
