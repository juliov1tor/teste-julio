
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artigo } from './entities/artigo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class ArtigosService {
  constructor(@InjectRepository(Artigo) private repo: Repository<Artigo>, @InjectRepository(Usuario) private userRepo: Repository<Usuario>) {}

  async criar(dados: Partial<Artigo>, autorId: number) {
    const autor = await this.userRepo.findOne({ where: { id: autorId } });
    const artigo = this.repo.create({ titulo: dados.titulo, conteudo: dados.conteudo, autor });
    return this.repo.save(artigo);
  }

  async listar() {
    return this.repo.find();
  }

  async buscarPorId(id: number) {
    const a = await this.repo.findOne({ where: { id } });
    if (!a) throw new NotFoundException('Artigo não encontrado');
    return a;
  }

  async editar(id: number, dados: Partial<Artigo>, user: any) {
    const a = await this.buscarPorId(id);
    
    // se não for Admin e noã for autor bloqueiaa

    if (user.permissao !== 'Admin' && a.autor.id !== user.sub) {
      throw new ForbiddenException('Sem permissão para editar');
    }
    if (dados.titulo) a.titulo = dados.titulo;
    if (dados.conteudo) a.conteudo = dados.conteudo;
    return this.repo.save(a);
  }

  async apagar(id: number, user: any) {
    const a = await this.buscarPorId(id);
    if (user.permissao !== 'Admin' && a.autor.id !== user.sub) {
      throw new ForbiddenException('Sem permissão para apagar');
    }
    return this.repo.remove(a);
  }
}
