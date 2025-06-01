import { Curso } from "src/curso/entities/curso.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('bloque')
export class Bloque {
@PrimaryGeneratedColumn()
  idBloque: number;

  @Column('timestamp')
  fechaInicio: Date;

  @Column('timestamp')
  fechaFin: Date;

  @ManyToOne(() => Curso, curso => curso.bloques)
  @JoinColumn({ name: 'idCurso' })
  curso: Curso;

  @ManyToOne(() => Profesor, profesor => profesor.bloques)
  @JoinColumn({ name: 'idProfesor' })
  profesor: Profesor;
}
