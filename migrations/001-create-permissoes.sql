
-- cria tabela permissao (caso não exista) e insere permissões padrão
CREATE TABLE IF NOT EXISTS permissao (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) UNIQUE NOT NULL,
  descricao TEXT
);

INSERT INTO permissao (nome, descricao) VALUES
('Admin','Permissão para administrar artigos e usuários'),
('Editor','Permissão para administrar artigos'),
('Reader','Permissão para apenas ler artigos')
ON CONFLICT (nome) DO NOTHING;
