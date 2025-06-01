import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitudintService } from './solicitudint.service';
import { CreateSolicitudintDto } from './dto/create-solicitudint.dto';
import { UpdateSolicitudintDto } from './dto/update-solicitudint.dto';

@Controller('solicitudint')
export class SolicitudintController {
  constructor(private readonly solicitudintService: SolicitudintService) {}

  @Post()
  create(@Body() createSolicitudintDto: CreateSolicitudintDto) {
    return this.solicitudintService.create(createSolicitudintDto);
  }

  @Get()
  findAll() {
    return this.solicitudintService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudintService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudintDto: UpdateSolicitudintDto) {
    return this.solicitudintService.update(+id, updateSolicitudintDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudintService.remove(+id);
  }
}
