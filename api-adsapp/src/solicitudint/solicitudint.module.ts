import { Module } from '@nestjs/common';
import { SolicitudintService } from './solicitudint.service';
import { SolicitudintController } from './solicitudint.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitudint } from './entities/solicitudint.entity';
import { Interesado } from 'src/interesado/entities/interesado.entity';
import { ProgramaFormativo } from 'src/programa-formativo/entities/programa-formativo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solicitudint, Interesado, ProgramaFormativo])],
  controllers: [SolicitudintController],
  providers: [SolicitudintService],
  exports: [SolicitudintService]
})
export class SolicitudintModule {}
