import { Module } from '@nestjs/common';
import { EstudianteModule } from './estudiante/estudiante.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InteresadoModule } from './interesado/interesado.module';
import { PagoModule } from './pago/pago.module';
import { ProgramaFormativoModule } from './programa-formativo/programa-formativo.module';
import { SolicitudDirigidaEstudianteModule } from './solicitud-dirigida-estudiante/solicitud-dirigida-estudiante.module';
import { CursoModule } from './curso/curso.module';
import { CursoEstudianteModule } from './curso-estudiante/curso-estudiante.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { ProfesorModule } from './profesor/profesor.module';
import { BloqueModule } from './bloque/bloque.module';
import { DiaHoraModule } from './dia-hora/dia-hora.module';
import { InteresadoPfModule } from './interesado-pf/interesado-pf.module';
import { SolicitudintModule } from './solicitudint/solicitudint.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'david',
      database: 'adsapp_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EstudianteModule,
    InteresadoModule,
    PagoModule,
    ProgramaFormativoModule,
    SolicitudDirigidaEstudianteModule,
    CursoModule,
    CursoEstudianteModule,
    EvaluacionModule,
    ProfesorModule,
    BloqueModule,
    DiaHoraModule,
    InteresadoPfModule,
    SolicitudintModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
