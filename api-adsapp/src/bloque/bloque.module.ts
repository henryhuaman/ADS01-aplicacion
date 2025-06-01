import { Module } from '@nestjs/common';
import { BloqueService } from './bloque.service';
import { BloqueController } from './bloque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bloque } from './entities/bloque.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bloque, Curso, Profesor])],
  controllers: [BloqueController],
  providers: [BloqueService],
  exports: [BloqueService],
})
export class BloqueModule {}
