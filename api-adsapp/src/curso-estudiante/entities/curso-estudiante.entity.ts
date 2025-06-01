import { Curso } from "src/curso/entities/curso.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('curso-estudiante')
export class CursoEstudiante {
  @PrimaryColumn()
  idCurso: number;

  @PrimaryColumn()
  idEstudiante: number;

  @Column({ type: 'date' })
  fechaFin: Date;

  @ManyToOne(() => Curso, curso => curso.estudiantes)
  @JoinColumn({ name: 'idCurso' })
  curso: Curso;

  @ManyToOne(() => Estudiante, estudiante => estudiante.cursos)
  @JoinColumn({ name: 'idEstudiante' })
  estudiante: Estudiante;
}
