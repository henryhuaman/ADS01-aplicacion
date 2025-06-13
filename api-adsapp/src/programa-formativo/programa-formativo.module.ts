import { Module } from '@nestjs/common';
import { ProgramaFormativoService } from './programa-formativo.service';
import { ProgramaFormativoController } from './programa-formativo.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaFormativo } from './entities/programa-formativo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaFormativo])],
  controllers: [ProgramaFormativoController],
  providers: [ProgramaFormativoService],
  exports: [ProgramaFormativoService]
})
export class ProgramaFormativoModule {}
