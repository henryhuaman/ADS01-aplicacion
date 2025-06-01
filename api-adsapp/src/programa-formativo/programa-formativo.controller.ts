import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramaFormativoService } from './programa-formativo.service';
import { CreateProgramaFormativoDto } from './dto/create-programa-formativo.dto';
import { UpdateProgramaFormativoDto } from './dto/update-programa-formativo.dto';

@Controller('programa-formativo')
export class ProgramaFormativoController {
  constructor(private readonly programaFormativoService: ProgramaFormativoService) {}

  @Post()
  create(@Body() createProgramaFormativoDto: CreateProgramaFormativoDto) {
    return this.programaFormativoService.create(createProgramaFormativoDto);
  }

  @Get()
  findAll() {
    return this.programaFormativoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programaFormativoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramaFormativoDto: UpdateProgramaFormativoDto) {
    return this.programaFormativoService.update(+id, updateProgramaFormativoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programaFormativoService.remove(+id);
  }
}
