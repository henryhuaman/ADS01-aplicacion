import { Module } from '@nestjs/common';
import { CursoEstudianteService } from './curso-estudiante.service';
import { CursoEstudianteController } from './curso-estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEstudiante } from './entities/curso-estudiante.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CursoEstudiante,
      Curso,
      Estudiante
    ]),
  ],
  controllers: [CursoEstudianteController],
  providers: [CursoEstudianteService],
  exports: [CursoEstudianteService],
})
export class CursoEstudianteModule {}
