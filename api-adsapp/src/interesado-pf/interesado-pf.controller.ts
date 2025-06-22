import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InteresadoPfService } from './interesado-pf.service';
import { CreateInteresadoPfDto } from './dto/create-interesado-pf.dto';
import { UpdateInteresadoPfDto } from './dto/update-interesado-pf.dto';

@Controller('interesados-pf')
export class InteresadoPfController {
  constructor(private readonly interesadoPfService: InteresadoPfService) {}

  @Post()
  create(@Body() createInteresadoPfDto: CreateInteresadoPfDto) {
    return this.interesadoPfService.create(createInteresadoPfDto);
  }

  @Get()
  findAll(@Body() query: any) {
    return this.interesadoPfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interesadoPfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInteresadoPfDto: UpdateInteresadoPfDto) {
    return this.interesadoPfService.update(+id, updateInteresadoPfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interesadoPfService.remove(+id);
  }

  @Get('interesado/:id')
  findByInteresado(@Param('id') id: string) {
    return this.interesadoPfService.findByInteresado(+id);
  }

}
