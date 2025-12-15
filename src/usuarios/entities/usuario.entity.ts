
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Permissao } from '../../permissoes/entities/permissao.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;
  @Exclude()
  @Column({ select: false })
  senha: string;

  @ManyToOne(() => Permissao, (p) => p.usuarios, { eager: true })
  permissao: Permissao;

  @CreateDateColumn()
  criadoEm: Date;
}
