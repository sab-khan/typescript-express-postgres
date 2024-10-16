import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'text', nullable: false })
  name: string | undefined;

  @Column({ type: 'text', nullable: false })
  dept: string | undefined;
}
