
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Artigo } from './artigos/entities/artigo.entity';
import { Permissao } from './permissoes/entities/permissao.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ArtigosModule } from './artigos/artigos.module';
import { PermissoesModule } from './permissoes/permissoes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'db',
      port: +(process.env.DATABASE_PORT || 5432),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'teste',
      entities: [Usuario, Artigo, Permissao],
      synchronize: true
    }),
    UsuariosModule,
    ArtigosModule,
    PermissoesModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
