API DE ARTIGOS COM AUTENTICAÇÃO E AUTORIZAÇÃO

Este projeto é uma API REST desenvolvida com NestJS, utilizando JWT para autenticação
e controle de acesso baseado em níveis de permissão (Admin, Editor e Reader).

A API permite o gerenciamento de artigos, garantindo que cada ação só possa ser
executada por usuários autorizados, de acordo com seu perfil.

--------------------------------------------------

TECNOLOGIAS UTILIZADAS

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt
- Docker
- Docker Compose

--------------------------------------------------

SUBINDO O PROJETO

Pré-requisitos:
- Docker
- Docker Compose

Passos:

1) Subir os containers
   docker compose up -d

2) Executar o seed para criar tabelas e usuários iniciais
   docker compose exec app node dist/seed.js

--------------------------------------------------

USUÁRIOS CRIADOS AUTOMATICAMENTE (SEED)

O seed cria três tipos de usuários para facilitar os testes de autenticação
e autorização:

Perfil   | Email              | Senha
----------------------------------------
Admin    | root@local.dev     | root1234
Editor   | editor@local.dev   | editor123
Reader   | reader@local.dev   | reader123

--------------------------------------------------

AUTENTICAÇÃO

Endpoint de login:

POST /api/auth/login

Body (JSON):
{
  "email": "root@local.dev",
  "senha": "root1234"
}

Resposta:
{
  "access_token": "JWT_TOKEN"
}

O token retornado deve ser utilizado nas próximas requisições
no header Authorization como Bearer Token.

--------------------------------------------------

REGRAS DE ACESSO - ARTIGOS

LISTAR ARTIGOS
GET /api/artigos

Permissões:
- Admin: permitido
- Editor: permitido
- Reader: permitido

--------------------------------------------------

CRIAR ARTIGO
POST /api/artigos

Permissões:
- Admin: permitido
- Editor: permitido
- Reader: negado

Body (JSON):
{
  "titulo": "Novo artigo",
  "conteudo": "Conteúdo do artigo"
}

--------------------------------------------------

ATUALIZAR ARTIGO
PUT /api/artigos/:id

Permissões:
- Admin: permitido
- Editor: negado
- Reader: negado

--------------------------------------------------

REMOVER ARTIGO
DELETE /api/artigos/:id

Permissões:
- Admin: permitido
- Editor: negado
- Reader: negado

--------------------------------------------------

TESTES VIA POSTMAN

Uma collection do Postman acompanha o projeto, contendo:

- Login para Admin, Editor e Reader
- Testes de GET, POST, PUT e DELETE
- Validação de respostas 200, 401 e 403
- Organização clara por permissões

Basta importar a collection no Postman e executar os testes.

--------------------------------------------------

SEGURANÇA

- Senhas armazenadas de forma criptografada (bcrypt)
- Campo senha não é exposto em nenhuma resposta da API
- Controle de acesso implementado com Guards e Decorators
- JWT contém apenas informações essenciais do usuário
