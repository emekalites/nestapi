import { Entity, Column, BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'password_resets' })
export class PasswordReset extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 191 })
  email: string;

  @Column({ type: 'varchar', length: 191 })
  token: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', precision: 6 })
  created_at: Date;
}
