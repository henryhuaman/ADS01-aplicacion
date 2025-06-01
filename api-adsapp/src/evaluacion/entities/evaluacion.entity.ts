import { Curso } from "src/curso/entities/curso.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('evaluacion')
export class Evaluacion {
    @PrimaryGeneratedColumn()
    idEvaluacion: number;

    @OneToOne(()=> Estudiante )
    @JoinColumn({ name: 'idEstudiante' })
    estudiante: Estudiante;

    @OneToOne(()=> Curso )
    @JoinColumn({ name: 'idCurso' })
    curso: Curso;

    @Column()
    notaEvaluacion: number;

    @Column()
    tipoEvaluacion: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;


}
