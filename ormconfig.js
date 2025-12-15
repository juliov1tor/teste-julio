"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./src/usuarios/entities/usuario.entity");
const artigo_entity_1 = require("./src/artigos/entities/artigo.entity");
const permissao_entity_1 = require("./src/permissoes/entities/permissao.entity");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'db',
    port: +(process.env.DATABASE_PORT || 5432),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'teste',
    entities: [usuario_entity_1.Usuario, artigo_entity_1.Artigo, permissao_entity_1.Permissao],
    synchronize: false,
    migrations: ['migrations/*.sql']
});
