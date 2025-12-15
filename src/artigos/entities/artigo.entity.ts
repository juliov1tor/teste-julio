import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Artigo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ type: 'text' })
  conteudo!: string;

  @ManyToOne(() => Usuario, { eager: true })
  autor!: Usuario;

  @CreateDateColumn()
  criadoEm!: Date;
}
