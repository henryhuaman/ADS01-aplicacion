import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CursoEstudianteService } from './curso-estudiante.service';
import { CreateCursoEstudianteDto } from './dto/create-curso-estudiante.dto';
import { UpdateCursoEstudianteDto } from './dto/update-curso-estudiante.dto';

@Controller('curso-estudiantes')
export class CursoEstudianteController {
  constructor(private readonly cursoEstudianteService: CursoEstudianteService) {}

  @Post()
  create(@Body() createCursoEstudianteDto: CreateCursoEstudianteDto) {
    return this.cursoEstudianteService.create(createCursoEstudianteDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.cursoEstudianteService.findAll();
  }

  @Get(':idCurso/:idEstudiante')
  findOne(@Param('idCurso') idCurso: string, @Param('idEstudiante') idEstudiante: string) {
    return this.cursoEstudianteService.findOne(+idCurso, +idEstudiante);
  }

  @Get('por-curso/:idCurso')
  findByCurso(@Param('idCurso') idCurso: string) {
    return this.cursoEstudianteService.findByCurso(+idCurso);
  }

  @Get('por-estudiante/:idEstudiante')
  findByEstudiante(@Param('idEstudiante') idEstudiante: string) {
    return this.cursoEstudianteService.findByEstudiante(+idEstudiante);
  }

  @Patch(':idCurso/:idEstudiante')
  update(@Param('idCurso') idCurso: string, @Param('idEstudiante') idEstudiante: string, @Body() updateCursoEstudianteDto: UpdateCursoEstudianteDto) {
    return this.cursoEstudianteService.update(+idCurso, +idEstudiante, updateCursoEstudianteDto);
  }

  @Delete(':idCurso/:idEstudiante')
  remove(@Param('idCurso') idCurso: string, @Param('idEstudiante') idEstudiante: string) {
    return this.cursoEstudianteService.remove(+idCurso, +idEstudiante);
  }
}
