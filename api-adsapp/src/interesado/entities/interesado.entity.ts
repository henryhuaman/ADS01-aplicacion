import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
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
}
