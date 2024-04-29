import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Enlace {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  slug: string;

  @Column()
  urlOriginal: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  fechaCreacion: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  fechaExpiracion: Date;
}
