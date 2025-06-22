import { Interesado } from "src/interesado/entities/interesado.entity";
import { ProgramaFormativo } from "src/programa-formativo/entities/programa-formativo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('interesado_pf')
export class InteresadoPf {

    @PrimaryGeneratedColumn()
    idMatricula: number;

    @Column({ type: 'date' })
    fechaInicio: Date;

    @Column({ type: 'date' })
    fechaFin: Date;

    @ManyToOne(() => ProgramaFormativo)
    @JoinColumn({ name: 'idPrograma' })
    programa: ProgramaFormativo;
    
    @ManyToOne(() => Interesado, interesado => interesado.programas)
    @JoinColumn({ name: 'idInteresado' })
    interesado: Interesado;
}