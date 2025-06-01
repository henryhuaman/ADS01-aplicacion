import { Bloque } from "src/bloque/entities/bloque.entity";
import { CursoEstudiante } from "src/curso-estudiante/entities/curso-estudiante.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('curso')
export class Curso {
    @PrimaryGeneratedColumn()
    idCurso: number;

    @Column()
    nombreCurso: string;

    @Column()
    Descripcion: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
        
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => CursoEstudiante, ce => ce.curso)
    estudiantes: CursoEstudiante[];

    @OneToMany(() => Bloque, bloque => bloque.curso)
    bloques: Bloque[];
}
