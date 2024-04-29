import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Enlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Index() // Indexar para búsquedas más rápidas
  @Column({ unique: true })
  slug: string; // Versión corta o identificador del enlace

  @Column()
  urlOriginal: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column({ nullable: true })
  fechaExpiracion: Date; // Opcional, si quieres que los enlaces expiren
}
