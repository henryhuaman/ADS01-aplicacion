import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DiaHoraService } from './dia-hora.service';
import { CreateDiaHoraDto } from './dto/create-dia-hora.dto';
import { UpdateDiaHoraDto } from './dto/update-dia-hora.dto';

@Controller('dia-horas')
export class DiaHoraController {
  constructor(private readonly diaHoraService: DiaHoraService) {}

  @Post()
  create(@Body() createDiaHoraDto: CreateDiaHoraDto) {
    return this.diaHoraService.create(createDiaHoraDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.diaHoraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diaHoraService.findOne(+id);
  }

  @Get('bloque/:idBloque')
  findbyBloque(@Query('idBloque') idBloque: string) {
    return this.diaHoraService.findByBloque(+idBloque);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiaHoraDto: UpdateDiaHoraDto) {
    return this.diaHoraService.update(+id, updateDiaHoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diaHoraService.remove(+id);
  }
}
