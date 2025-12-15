
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artigo } from './entities/artigo.entity';
import { ArtigosService } from './artigos.service';
import { ArtigosController } from './artigos.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artigo, Usuario])],
  providers: [ArtigosService],
  controllers: [ArtigosController]
})
export class ArtigosModule {}
