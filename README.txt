# 🧩 API de Artigos com Autenticação e Autorização

Este projeto é uma API REST desenvolvida com **NestJS**, utilizando **JWT para autenticação** e **controle de acesso por níveis de permissão** (Admin, Editor e Reader).

A API permite o gerenciamento de artigos, garantindo que cada ação seja executada apenas por usuários autorizados, de acordo com seu perfil.

---

## 🚀 Tecnologias utilizadas

* Node.js
* NestJS
* TypeORM
* PostgreSQL
* JWT (JSON Web Token)
* bcrypt
* Docker + Docker Compose

---

## 📦 Subindo o projeto

Certifique-se de ter **Docker** e **Docker Compose** instalados.

```bash
docker compose up -d
```

Após subir os containers, execute o seed para criação das tabelas e usuários iniciais:

```bash
docker compose exec app node dist/seed.js
```

---

## 👤 Usuários criados automaticamente (seed)

O seed cria três tipos de usuários para facilitar os testes de autorização:

| Perfil | Email                                       | Senha     |
| ------ | ------------------------------------------- | --------- |
| Admin  | [root@local.dev](mailto:root@local.dev)     | root1234  |
| Editor | [editor@local.dev](mailto:editor@local.dev) | editor123 |
| Reader | [reader@local.dev](mailto:reader@local.dev) | reader123 |

---

## 🔐 Autenticação

### Login

```http
POST /api/auth/login
```

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

Esse token deve ser enviado nas próximas requisições via **Authorization → Bearer Token**.

---

## 📰 Artigos – Regras de acesso

### 🔍 Listar artigos

```http
GET /api/artigos
```

* ✅ Admin
* ✅ Editor
* ✅ Reader

---

### ➕ Criar artigo

```http
POST /api/artigos
```

* ✅ Admin
* ✅ Editor
* ❌ Reader

**Body (JSON):**

```json
{
  "titulo": "Novo artigo",
  "conteudo": "Conteúdo do artigo"
}
```

---

### ✏️ Atualizar artigo

```http
PUT /api/artigos/:id
```

* ✅ Admin
* ❌ Editor
* ❌ Reader

---

### 🗑️ Remover artigo

```http
DELETE /api/artigos/:id
```

* ✅ Admin
* ❌ Editor
* ❌ Reader

---

## 🧪 Testes via Postman

Uma **collection do Postman** acompanha o projeto, contendo:

* Login por perfil (Admin, Editor, Reader)
* Testes de GET, POST, PUT e DELETE
* Validação de respostas **200, 403 e 401**
* Organização clara por permissões

Basta importar a collection no Postman e executar os testes.

---

## 🔐 Segurança

* Senhas são armazenadas de forma criptografada (bcrypt)
* Campo `senha` não é exposto em nenhuma resposta da API
* Controle de acesso implementado com **Guards e Decorators**
* Token JWT carrega apenas informações essenciais do usuário

