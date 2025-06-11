import { Bloque } from "src/bloque/entities/bloque.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('dia_hora')
export class DiaHora {
@PrimaryGeneratedColumn()
  idDiaHora: number;
  
  @Column({ type: 'date' }) // Solo almacena fecha (YYYY-MM-DD)
  dia: Date;

  @Column({ type: 'time' }) // Formato HH:MM:SS
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @ManyToOne(() => Bloque, bloque => bloque.diaHoras)
    @JoinColumn({ name: 'idBloque' })
    bloque: Bloque;
}
