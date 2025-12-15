
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { ArtigosService } from './artigos.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('artigos')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ArtigosController {
  constructor(private artigosService: ArtigosService) {}

  @Get()
  @Roles('Admin','Editor','Reader')
  async listar() {
    return this.artigosService.listar();
  }

  @Get(':id')
  @Roles('Admin','Editor','Reader')
  async buscar(@Param('id') id: number) {
    return this.artigosService.buscarPorId(+id);
  }

  @Post()
  @Roles('Admin','Editor')
  async criar(@Body() body, @Request() req) {
    return this.artigosService.criar(body, req.user.sub);
  }

  @Put(':id')
  @Roles('Admin','Editor')
  async editar(@Param('id') id: number, @Body() body, @Request() req) {
    return this.artigosService.editar(+id, body, req.user);
  }

  @Delete(':id')
  @Roles('Admin','Editor')
  async apagar(@Param('id') id: number, @Request() req) {
    return this.artigosService.apagar(+id, req.user);
  }
}
