import { Module } from '@nestjs/common';
import { SolicitudDirigidaEstudianteService } from './solicitud-dirigida-estudiante.service';
import { SolicitudDirigidaEstudianteController } from './solicitud-dirigida-estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudDirigidaEstudiante } from './entities/solicitud-dirigida-estudiante.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Curso } from 'src/curso/entities/curso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitudDirigidaEstudiante,
      Estudiante,
      Curso,
    ]),
  ],
  controllers: [SolicitudDirigidaEstudianteController],
  providers: [SolicitudDirigidaEstudianteService],
  exports: [SolicitudDirigidaEstudianteService],
})
export class SolicitudDirigidaEstudianteModule {}
