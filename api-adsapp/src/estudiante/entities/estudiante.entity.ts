import { CursoEstudiante } from "src/curso-estudiante/entities/curso-estudiante.entity";
import { Curso } from "src/curso/entities/curso.entity";
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

}





