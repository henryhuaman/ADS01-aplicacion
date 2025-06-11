import { Module } from '@nestjs/common';
import { DiaHoraService } from './dia-hora.service';
import { DiaHoraController } from './dia-hora.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaHora } from './entities/dia-hora.entity';
import { Bloque } from 'src/bloque/entities/bloque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiaHora, Bloque])],
  controllers: [DiaHoraController],
  providers: [DiaHoraService],
  exports: [DiaHoraService]
})
export class DiaHoraModule {}
