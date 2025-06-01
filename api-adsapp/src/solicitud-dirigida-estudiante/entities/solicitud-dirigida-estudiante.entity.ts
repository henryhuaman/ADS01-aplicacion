import { Curso } from "src/curso/entities/curso.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('SolicitudDirigidaEstudiante')
export class SolicitudDirigidaEstudiante {
    @PrimaryGeneratedColumn()
    idSolicitud: number;
    
    @ManyToOne(() => Estudiante)
    @JoinColumn({ name: 'idEstudiante' })
    interesado: Estudiante;

    @OneToOne(() => Curso)
    @JoinColumn({ name: 'idCurso' })
    curso: Curso;
    
    @Column()
    fechaSolicitudEgresado: Date;
    
    @Column({ length: 10 })
    estadoResolucion: string;

    @Column({ nullable: true })
    descripcion: string;
    
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date; 
}
