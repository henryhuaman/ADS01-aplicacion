import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InteresadoService } from './interesado.service';
import { CreateInteresadoDto } from './dto/create-interesado.dto';
import { UpdateInteresadoDto } from './dto/update-interesado.dto';

@Controller('interesados')
export class InteresadoController {
  constructor(private readonly interesadoService: InteresadoService) {}

  @Post()
  create(@Body() createInteresadoDto: CreateInteresadoDto): Promise<CreateInteresadoDto | any> {
    return this.interesadoService.create(createInteresadoDto);
  }

  @Get()
  findAll(@Query() query: any) {

    return this.interesadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interesadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInteresadoDto: UpdateInteresadoDto) {
    return this.interesadoService.update(+id, updateInteresadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interesadoService.remove(+id);
  }
}
