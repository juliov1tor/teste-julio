
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usuariosService: UsuariosService, private jwtService: JwtService) {}

  async validateUsuario(email: string, senha: string) {
    const usuario = await this.usuariosService.buscarPorEmail(email);
    if (!usuario) return null;
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (isMatch) {
      const { senha, ...rest } = usuario as any;
      return rest;
    }
    return null;
  }

 async login(email: string, senha: string) {
  const usuario = await this.usuariosService.buscarPorEmail(email);

  if (!usuario) {
    throw new UnauthorizedException('Credenciais inválidas');
  }

  const match = await bcrypt.compare(senha, usuario.senha);

  if (!match) {
    throw new UnauthorizedException('Credenciais inválidas');
  }

  const payload = {
    sub: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    permissao: usuario.permissao?.nome,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}

}
