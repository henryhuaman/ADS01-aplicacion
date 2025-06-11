import { Bloque } from "src/bloque/entities/bloque.entity";
import { Evaluacion } from "src/evaluacion/entities/evaluacion.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('profesor')
export class Profesor {
    @PrimaryGeneratedColumn()
    idProfesor: number;

    @Column()
    nombreProfesor: string;

    @Column()
    apellidoProfesor: string;

    @Column()
    correoProfesor: string;

    @Column()
    contraseñaProfesor: string;

    @Column()
    estadoProfesor: string;

    @OneToMany(() => Bloque, bloque => bloque.profesor)
    bloques: Bloque[];

    @OneToMany(() => Evaluacion, evaluacion => evaluacion.profesor)
    evaluaciones: Evaluacion[];
}
