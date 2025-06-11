import { Curso } from "src/curso/entities/curso.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('evaluacion')
export class Evaluacion {
    @PrimaryGeneratedColumn()
    idEvaluacion: number;

    @ManyToOne(()=> Estudiante )
    @JoinColumn({ name: 'idEstudiante' })
    estudiante: Estudiante;

    @ManyToOne(()=> Curso, {eager:true} )
    @JoinColumn({ name: 'idCurso' })
    curso: Curso;

    @ManyToOne(() => Profesor, profesor => profesor.evaluaciones)
    @JoinColumn({ name: 'idProfesor' })
    profesor: Profesor;

    @Column()
    notaEvaluacion: number;

    @Column()
    tipoEvaluacion: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
