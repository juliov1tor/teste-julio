
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissao } from './entities/permissao.entity';
import { PermissoesService } from './permissoes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permissao])],
  providers: [PermissoesService],
  exports: [PermissoesService]
})
export class PermissoesModule {}
