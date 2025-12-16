
# API de Artigos — JWT + Permissões (Admin/Editor/Reader)

API REST em **NestJS** com **autenticação via JWT** e **autorização por perfil** (**Admin**, **Editor**, **Reader**) para controlar o que cada usuário pode fazer.

---

## Stack

- Node.js / NestJS
- TypeORM
- PostgreSQL
- JWT
- bcrypt
- Docker / Docker Compose

---

## Como subir (Docker)

### Pré-requisitos
- Docker
- Docker Compose

### Subir containers
```bash
docker compose up -d
````

### Rodar seed (cria tabelas e usuários iniciais)

```bash
docker compose exec app node dist/seed.js
```

---

## Usuários iniciais (Seed)

| Perfil | Email                                       | Senha     |
| ------ | ------------------------------------------- | --------- |
| Admin  | [root@local.dev](mailto:root@local.dev)     | root1234  |
| Editor | [editor@local.dev](mailto:editor@local.dev) | editor123 |
| Reader | [reader@local.dev](mailto:reader@local.dev) | reader123 |

---

## Autenticação (JWT)

### 1) Fazer login

Envie email e senha para o endpoint de login.

**Body (JSON):**

```json
{
  "email": "root@local.dev",
  "senha": "root1234"
}
```

**Resposta:**

```json
{
  "access_token": "JWT_TOKEN"
}
```

### 2) Usar o token nas requisições

Depois do login, utilize o token no header:

```
Authorization: Bearer JWT_TOKEN
```

Se o token estiver:

* ausente ou inválido → **401 Unauthorized**
* válido, mas sem permissão para a ação → **403 Forbidden**

---

## Perfis e permissões (resumo)

* **Admin**: acesso total (CRUD completo)
* **Editor**: acesso intermediário (pode criar e listar, mas não faz ações restritas ao Admin)
* **Reader**: somente leitura (listar/consultar)

> As regras são aplicadas via **Guards** e **Decorators** no NestJS.

---

## Segurança

* Senhas protegidas com **bcrypt**
* Campo `senha` não é retornado nas respostas
* JWT contém apenas dados essenciais do usuário (mínimo necessário)

---

## Testes (Postman)

O projeto acompanha uma **collection do Postman** com:

* Login (Admin/Editor/Reader)
* Cenários de sucesso e bloqueio (**200 / 401 / 403**)
* Requests organizadas por perfil/permissão

