import { Module } from '@nestjs/common';
import { SolicitudintService } from './solicitudint.service';
import { SolicitudintController } from './solicitudint.controller';

@Module({
  controllers: [SolicitudintController],
  providers: [SolicitudintService],
})
export class SolicitudintModule {}
