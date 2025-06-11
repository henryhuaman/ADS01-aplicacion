import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BloqueService } from './bloque.service';
import { CreateBloqueDto } from './dto/create-bloque.dto';
import { UpdateBloqueDto } from './dto/update-bloque.dto';

@Controller('bloques')
export class BloqueController {
  constructor(private readonly bloqueService: BloqueService) {}

  @Post()
  create(@Body() createBloqueDto: CreateBloqueDto) {
    return this.bloqueService.create(createBloqueDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.bloqueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloqueService.findOne(+id);
  }

  @Get('curso/:idCurso')
  findByCurso(@Param('idCurso') idCurso: string) {
    return this.bloqueService.findByCurso(+idCurso);
  }

  @Get('profesor/:idProfesor')
  findByProfesor(@Param('idProfesor') idProfesor: string) {
    return this.bloqueService.findByProfesor(+idProfesor);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloqueDto: UpdateBloqueDto) {
    return this.bloqueService.update(+id, updateBloqueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloqueService.remove(+id);
  }
}
