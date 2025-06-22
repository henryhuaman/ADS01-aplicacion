import { Controller, Get, Post, Res, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
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

  @Post('login')
  async login(
    @Body() body: { correo: string; contraseña: string },
    @Res() res: any,
  ) {
    try {
      const interesado = await this.interesadoService.findByCredentials(
        body.correo,
        body.contraseña,
      );
      
      if (!interesado) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Credenciales incorrectas',
        });
      }

      return res.status(HttpStatus.OK).json({
        idInteresado: interesado.idInteresado,
        nombre: `${interesado.nombreInteresado} ${interesado.apellidoInteresado}`,
        dni: interesado.dniInteresado,
        correo: interesado.correoInteresado,
        telefono: interesado.telefonoInteresado,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error en el servidor',
      });
    }
  }
}
