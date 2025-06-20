import { CursoEstudiante } from "src/curso-estudiante/entities/curso-estudiante.entity";
import { Curso } from "src/curso/entities/curso.entity";
import { Evaluacion } from "src/evaluacion/entities/evaluacion.entity";
import { SolicitudDirigidaEstudiante } from "src/solicitud-dirigida-estudiante/entities/solicitud-dirigida-estudiante.entity";
import {  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class Estudiante {

    @PrimaryGeneratedColumn()
    idEstudiante: number;

    @Column()
    nombreEstudiante: string;

    @Column()
    apellidoEstudiante: string;

    @Column({unique: true})
    dniEstudiante: string;

    @Column()
    fechaNacimientoEstudiante: Date;

    @Column({unique: true})
    correoEstudiante: string;

    @Column()
    contraseñaEstudiante: string;

    @Column({unique: true})
    codigoMatricula: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @OneToMany(() => CursoEstudiante, ce => ce.estudiante)
    cursos: CursoEstudiante[];

    @OneToMany(() => SolicitudDirigidaEstudiante, sde => sde.estudiante)
    solicitudesDirigidas: SolicitudDirigidaEstudiante[];

    @OneToMany(() => Evaluacion, evaluacion => evaluacion.estudiante)
    evaluaciones: Evaluacion[];
}





