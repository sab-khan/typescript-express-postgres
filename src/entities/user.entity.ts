import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number | undefined;

  @Column({ type: 'varchar', nullable: false })
  name: string | undefined;
}
