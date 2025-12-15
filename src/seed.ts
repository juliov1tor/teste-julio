import 'reflect-metadata';
import * as bcrypt from 'bcryptjs';
import { ds } from './ormconfig';
import { Permissao } from './permissoes/entities/permissao.entity';
import { Usuario } from './usuarios/entities/usuario.entity';
import { DeepPartial } from 'typeorm';

async function run() {
  // inicializa datasource (lê configurações em src/ormconfig.ts)
  await ds.initialize();
  console.log('Conectado ao banco para seed');

  // sincroniza schema para desenvolvimento (remover em produção)
  await ds.synchronize();
  console.log('Banco sincronizado (tabelas criadas/atualizadas)');

  const permRepo = ds.getRepository(Permissao);
  const userRepo = ds.getRepository(Usuario);

  // lista de permissões desejadas
  const perms = ['Admin', 'Editor', 'Reader'];

  for (const p of perms) {
    const exists = await permRepo.findOne({ where: { nome: p } });
    if (!exists) {
      const novo = permRepo.create({
        nome: p,
        descricao: `${p} criado pelo seed`,
      });
      await permRepo.save(novo);
      console.log('Permissão criada:', p);
    }
  }

  // cria usuário root (Admin) se não existir
  const rootEmail = 'root@local.dev';
  const rootExists = await userRepo.findOne({ where: { email: rootEmail } });

  if (!rootExists) {
    let admin = await permRepo.findOne({ where: { nome: 'Admin' } });
    if (!admin) {
      admin = permRepo.create({
        nome: 'Admin',
        descricao: 'Admin criado pelo seed (fallback)',
      });
      await permRepo.save(admin);
      console.log('Permissão Admin criada pelo seed (fallback).');
    }

    const senhaHash = await bcrypt.hash('root1234', 10);

    const usuarioData: DeepPartial<Usuario> = {
      nome: 'root',
      email: rootEmail,
      senha: senhaHash,
      permissao: admin,
    };

    const novoRoot = userRepo.create(usuarioData as any);
    await userRepo.save(novoRoot);

    console.log('Usuário root criado: root@local.dev / senha: root1234');
  } else {
    console.log('Usuário root já existe');
  }

  // Criando o Editor e Reader para testes
  const editorEmail = 'editor@local.dev';
  const readerEmail = 'reader@local.dev';

  const editorExists = await userRepo.findOne({ where: { email: editorEmail } });
  if (!editorExists) {
    const senhaEditor = await bcrypt.hash('editor123', 10);
    let editorPerm = await permRepo.findOne({ where: { nome: 'Editor' } });
    if (!editorPerm) {
      editorPerm = permRepo.create({ nome: 'Editor', descricao: 'Editor criado pelo seed' });
      await permRepo.save(editorPerm);
    }

    const usuarioEditorData: DeepPartial<Usuario> = {
      nome: 'Editor',
      email: editorEmail,
      senha: senhaEditor,
      permissao: editorPerm,
    };
    const novoEditor = userRepo.create(usuarioEditorData as any);
    await userRepo.save(novoEditor);

    console.log('Usuário Editor criado: editor@local.dev / senha: editor123');
  } else {
    console.log('Usuário Editor já existe');
  }

  const readerExists = await userRepo.findOne({ where: { email: readerEmail } });
  if (!readerExists) {
    const senhaReader = await bcrypt.hash('reader123', 10);
    let readerPerm = await permRepo.findOne({ where: { nome: 'Reader' } });
    if (!readerPerm) {
      readerPerm = permRepo.create({ nome: 'Reader', descricao: 'Reader criado pelo seed' });
      await permRepo.save(readerPerm);
    }

    const usuarioReaderData: DeepPartial<Usuario> = {
      nome: 'Reader',
      email: readerEmail,
      senha: senhaReader,
      permissao: readerPerm,
    };
    const novoReader = userRepo.create(usuarioReaderData as any);
    await userRepo.save(novoReader);

    console.log('Usuário Reader criado: reader@local.dev / senha: reader123');
  } else {
    console.log('Usuário Reader já existe');
  }

  await ds.destroy();
  console.log('Seed finalizado e conexão encerrada.');
}

run().catch((e) => {
  console.error('Seed falhou', e);
  process.exit(1);
});
