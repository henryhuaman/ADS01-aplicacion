import { Module } from '@nestjs/common';
import { ProgramaFormativoService } from './programa-formativo.service';
import { ProgramaFormativoController } from './programa-formativo.controller';

@Module({
  controllers: [ProgramaFormativoController],
  providers: [ProgramaFormativoService],
})
export class ProgramaFormativoModule {}
