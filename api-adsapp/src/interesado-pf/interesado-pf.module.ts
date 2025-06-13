import { Module } from '@nestjs/common';
import { InteresadoPfService } from './interesado-pf.service';
import { InteresadoPfController } from './interesado-pf.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteresadoPf } from './entities/interesado-pf.entity';
import { Interesado } from 'src/interesado/entities/interesado.entity';
import { ProgramaFormativo } from 'src/programa-formativo/entities/programa-formativo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InteresadoPf, Interesado, ProgramaFormativo])],
  controllers: [InteresadoPfController],
  providers: [InteresadoPfService],
  exports: [InteresadoPfService],
})
export class InteresadoPfModule {}
