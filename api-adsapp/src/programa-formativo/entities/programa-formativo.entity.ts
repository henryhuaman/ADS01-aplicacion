
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('programa_formativo')
export class ProgramaFormativo {
    @PrimaryGeneratedColumn()
    idPrograma: number;

    @Column()
    nombrePrograma: string;

    @Column()
    descripcion: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
