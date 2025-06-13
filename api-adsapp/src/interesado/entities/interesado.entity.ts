import { InteresadoPf } from "src/interesado-pf/entities/interesado-pf.entity";
import { ProgramaFormativo } from "src/programa-formativo/entities/programa-formativo.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('interesado')
export class Interesado {

    @PrimaryGeneratedColumn()
    idInteresado: number;

    @Column()
    nombreInteresado: string;

    @Column()
    apellidoInteresado: string;

    @Column({unique: true})
    dniInteresado: string;

    @Column({unique: true})
    correoInteresado: string;

    @Column()
    contraseñaInteresado: string;

    @Column()
    telefonoInteresado: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => InteresadoPf, intpf => intpf.interesado)
    programas: InteresadoPf[];

}
