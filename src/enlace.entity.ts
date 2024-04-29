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

  @Index()
  @Column({ unique: true })
  slug: string;

  @Column()
  urlOriginal: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  fechaExpiracion: Date | null;
}
