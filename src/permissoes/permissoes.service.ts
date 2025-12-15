
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissao } from './entities/permissao.entity';

@Injectable()
export class PermissoesService {
  constructor(@InjectRepository(Permissao) private repo: Repository<Permissao>) {}

  listar() {
    return this.repo.find();
  }

  buscarPorNome(nome: string) {
    return this.repo.findOne({ where: { nome } });
  }
}
