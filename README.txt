<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>API de Artigos - NestJS</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      margin: 40px;
      background-color: #ffffff;
      color: #333;
    }

    h1, h2, h3 {
      color: #222;
    }

    h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 22px;
      margin-top: 30px;
    }

    h3 {
      font-size: 18px;
      margin-top: 20px;
    }

    p {
      margin: 10px 0;
    }

    ul {
      margin-left: 20px;
    }

    code {
      background-color: #f4f4f4;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: Consolas, monospace;
    }

    pre {
      background-color: #f4f4f4;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin-top: 15px;
    }

    table, th, td {
      border: 1px solid #ddd;
    }

    th, td {
      padding: 10px;
      text-align: left;
    }

    th {
      background-color: #f0f0f0;
    }

    .allowed {
      color: green;
      font-weight: bold;
    }

    .denied {
      color: red;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <h1>🧩 API de Artigos com Autenticação e Autorização</h1>

  <p>
    Este projeto é uma API REST desenvolvida com <strong>NestJS</strong>,
    utilizando <strong>JWT para autenticação</strong> e
    <strong>controle de acesso por níveis de permissão</strong>
    (Admin, Editor e Reader).
  </p>

  <p>
    A API permite o gerenciamento de artigos, garantindo que cada ação seja
    executada apenas por usuários autorizados, de acordo com seu perfil.
  </p>

  <h2>🚀 Tecnologias utilizadas</h2>
  <ul>
    <li>Node.js</li>
    <li>NestJS</li>
    <li>TypeORM</li>
    <li>PostgreSQL</li>
    <li>JWT (JSON Web Token)</li>
    <li>bcrypt</li>
    <li>Docker e Docker Compose</li>
  </ul>

  <h2>📦 Como executar o projeto</h2>

  <p>Certifique-se de ter <strong>Docker</strong> e <strong>Docker Compose</strong> instalados.</p>

  <pre><code>docker compose up -d</code></pre>

  <p>Após subir os containers, execute o seed para criação das tabelas e usuários iniciais:</p>

  <pre><code>docker compose exec app node dist/seed.js</code></pre>

  <h2>👤 Usuários criados automaticamente (seed)</h2>

  <table>
    <thead>
      <tr>
        <th>Perfil</th>
        <th>Email</th>
        <th>Senha</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Admin</td>
        <td>root@local.dev</td>
        <td>root1234</td>
      </tr>
      <tr>
        <td>Editor</td>
        <td>editor@local.dev</td>
        <td>editor123</td>
      </tr>
      <tr>
        <td>Reader</td>
        <td>reader@local.dev</td>
        <td>reader123</td>
      </tr>
    </tbody>
  </table>

  <h2>🔐 Autenticação</h2>

  <h3>Login</h3>

  <p>Endpoint:</p>
  <pre><code>POST /api/auth/login</code></pre>

  <p>Body da requisição:</p>

  <pre><code>{
  "email": "root@local.dev",
  "senha": "root1234"
}</code></pre>

  <p>Resposta esperada:</p>

  <pre><code>{
  "access_token": "JWT_TOKEN"
}</code></pre>

  <p>
    O token retornado deve ser enviado nas próximas requisições via
    <strong>Authorization: Bearer TOKEN</strong>.
  </p>

  <h2>📰 Artigos – Regras de acesso</h2>

  <h3>Listar artigos</h3>
  <pre><code>GET /api/artigos</code></pre>
  <p>
    <span class="allowed">Admin</span>,
    <span class="allowed">Editor</span>,
    <span class="allowed">Reader</span>
  </p>

  <h3>Criar artigo</h3>
  <pre><code>POST /api/artigos</code></pre>
  <p>
    <span class="allowed">Admin</span>,
    <span class="allowed">Editor</span>,
    <span class="denied">Reader</span>
  </p>

  <h3>Atualizar artigo</h3>
  <pre><code>PUT /api/artigos/:id</code></pre>
  <p>
    <span class="allowed">Admin</span>,
    <span class="denied">Editor</span>,
    <span class="denied">Reader</span>
  </p>

  <h3>Remover artigo</h3>
  <pre><code>DELETE /api/artigos/:id</code></pre>
  <p>
    <span class="allowed">Admin</span>,
    <span class="denied">Editor</span>,
    <span class="denied">Reader</span>
  </p>

  <h2>🧪 Testes com Postman</h2>

  <p>
    O projeto acompanha uma <strong>collection do Postman</strong>, contendo:
  </p>

  <ul>
    <li>Login por perfil (Admin, Editor e Reader)</li>
    <li>Testes de GET, POST, PUT e DELETE</li>
    <li>Validação de respostas 200, 401 e 403</li>
    <li>Organização clara por nível de permissão</li>
  </ul>

  <h2>🔐 Considerações de segurança</h2>

  <ul>
    <li>Senhas armazenadas de forma criptografada com bcrypt</li>
    <li>Campo <code>senha</code> não é exposto nas respostas da API</li>
    <li>Controle de acesso implementado com Guards e Decorators</li>
    <li>Token JWT contém apenas informações essenciais do usuário</li>
  </ul>

</body>
</html>
