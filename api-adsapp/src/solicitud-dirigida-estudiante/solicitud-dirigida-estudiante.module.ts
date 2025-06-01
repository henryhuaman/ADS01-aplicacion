import { Module } from '@nestjs/common';
import { SolicitudDirigidaEstudianteService } from './solicitud-dirigida-estudiante.service';
import { SolicitudDirigidaEstudianteController } from './solicitud-dirigida-estudiante.controller';

@Module({
  controllers: [SolicitudDirigidaEstudianteController],
  providers: [SolicitudDirigidaEstudianteService],
})
export class SolicitudDirigidaEstudianteModule {}
