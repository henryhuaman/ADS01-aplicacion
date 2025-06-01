import { Interesado } from "src/interesado/entities/interesado.entity";
import { ProgramaFormativo } from "src/programa-formativo/entities/programa-formativo.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('SolicitudDirigidaInteresado')
export class Solicitudint {
    @PrimaryGeneratedColumn()
  idSolicitud: number;

  @ManyToOne(() => Interesado)
  @JoinColumn({ name: 'idInteresado' })
    interesado: Interesado;


  @OneToOne(() => ProgramaFormativo)
  @JoinColumn({ name: 'idProgramaFormativo' })
  programaFormativo: ProgramaFormativo;

  @Column()
  fechaSolicitudEgresado: Date;

  @Column({ length: 15 })
  documentoSolicitado: string;

  @Column({ length: 10 })
  estadoTramite: string;

  @Column({ length: 70, nullable: true })
  observacionSolicitud: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date; 
}
