import { Module } from '@nestjs/common';
import { InteresadoService } from './interesado.service';
import { InteresadoController } from './interesado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interesado } from './entities/interesado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interesado])],  
  controllers: [InteresadoController],
  providers: [InteresadoService],
})
export class InteresadoModule {}
