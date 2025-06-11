import { Curso } from "src/curso/entities/curso.entity";
import { DiaHora } from "src/dia-hora/entities/dia-hora.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => DiaHora, diaHora => diaHora.bloque)
  diaHoras: DiaHora[];
}
