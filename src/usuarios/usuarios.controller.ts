
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuarios')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post()
  @Roles('Admin')
  async criar(@Body() body: any) {
    return this.usuariosService.criar(body);
  }

  @Get()
  @Roles('Admin')
  async listar() {
    return this.usuariosService.listar();
  }

  @Get(':id')
  @Roles('Admin')
  async buscar(@Param('id') id: number) {
    return this.usuariosService.buscarPorId(+id);
  }

  @Put(':id')
  @Roles('Admin')
  async editar(@Param('id') id: number,
   @Body() body: any) {
    return this.usuariosService.editar(+id, body);
  }

  @Delete(':id')
  @Roles('Admin')
  async apagar(@Param('id') id: number) {
    return this.usuariosService.apagar(+id);
  }
}
