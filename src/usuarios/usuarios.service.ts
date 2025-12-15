import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Usuario } from './entities/usuario.entity';
import { Permissao } from '../permissoes/entities/permissao.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repo: Repository<Usuario>,

    @InjectRepository(Permissao)
    private readonly permRepo: Repository<Permissao>,
  ) {}

  async criar(dados: Partial<Usuario>) {
    if (!dados.nome) throw new BadRequestException('Nome obrigatório');
    if (!dados.email) throw new BadRequestException('Email obrigatório');

    const senhaRaw = String(dados.senha ?? 'changeme123');
    const senhaHash = await bcrypt.hash(senhaRaw, 10);

    let permissao: Permissao | null = null;

    if (typeof dados.permissao === 'object' && dados.permissao) {
      permissao = dados.permissao as Permissao;
    } else if (typeof dados.permissao === 'string') {
      permissao = await this.permRepo.findOne({
        where: { nome: dados.permissao },
      });
    } else {
      permissao = await this.permRepo.findOne({
        where: { nome: 'Reader' },
      });
    }

    const usuarioData: DeepPartial<Usuario> = {
      nome: String(dados.nome),
      email: String(dados.email),
      senha: senhaHash,
      permissao: permissao ?? undefined,
    };

    const u = this.repo.create(usuarioData);
    return this.repo.save(u);
  }

  async listar() {
    return this.repo.find();
  }

  async buscarPorId(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async buscarPorEmail(email: string) {
    return this.repo
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .leftJoinAndSelect('usuario.permissao', 'permissao')
      .where('usuario.email = :email', { email })
      .getOne();
  }

  async editar(id: number, dados: Partial<Usuario>) {
    const usuario = await this.buscarPorId(id);

    if (dados.nome) usuario.nome = String(dados.nome);
    if (dados.email) usuario.email = String(dados.email);

    if (dados.senha) {
      usuario.senha = await bcrypt.hash(String(dados.senha), 10);
    }

    if (dados.permissao) {
      const novaPerm = await this.permRepo.findOne({
        where: { nome: String(dados.permissao) },
      });
      if (!novaPerm) throw new BadRequestException('Permissão inválida');
      usuario.permissao = novaPerm;
    }

    return this.repo.save(usuario);
  }

  async remover(id: number) {
    const usuario = await this.buscarPorId(id);
    await this.repo.remove(usuario);
    return { message: 'Usuário removido com sucesso' };
  }

  async apagar(id: number) {
    return this.remover(id);
  }
}
