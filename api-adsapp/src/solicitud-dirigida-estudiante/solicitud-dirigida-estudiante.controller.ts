import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitudDirigidaEstudianteService } from './solicitud-dirigida-estudiante.service';
import { CreateSolicitudDirigidaEstudianteDto } from './dto/create-solicitud-dirigida-estudiante.dto';
import { UpdateSolicitudDirigidaEstudianteDto } from './dto/update-solicitud-dirigida-estudiante.dto';

@Controller('solicitud-dirigida-estudiante')
export class SolicitudDirigidaEstudianteController {
  constructor(private readonly solicitudDirigidaEstudianteService: SolicitudDirigidaEstudianteService) {}

  @Post()
  create(@Body() createSolicitudDirigidaEstudianteDto: CreateSolicitudDirigidaEstudianteDto) {
    return this.solicitudDirigidaEstudianteService.create(createSolicitudDirigidaEstudianteDto);
  }

  @Get()
  findAll() {
    return this.solicitudDirigidaEstudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudDirigidaEstudianteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudDirigidaEstudianteDto: UpdateSolicitudDirigidaEstudianteDto) {
    return this.solicitudDirigidaEstudianteService.update(+id, updateSolicitudDirigidaEstudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudDirigidaEstudianteService.remove(+id);
  }
}
