    import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProgramaFormativo {
    @PrimaryGeneratedColumn()
    idPrograma: number;

    @Column()
    nombrePrograma: string;

    @Column()
    periodoEjecucion: string;

    @Column({ type: 'timestamptz' })
    fechaInicio: Date;

    @Column({ type: 'timestamptz' })
    fechaFin: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;    
}
