import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { State } from './state.entity';

@Entity({ name: 'countries' })
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 191 })
  name: string;

  @Column({ type: 'varchar', length: 191 })
  code: string;

  @Column({ type: 'varchar', length: 191 })
  phone_code: string;

  @Column({ type: 'varchar', default: 'admin' })
  created_by: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', precision: 6 })
  created_at: Date;

  @OneToMany(() => State, (state) => state.country)
  state: State;
}
