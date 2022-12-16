import { CustomBaseEntity } from '../../../common/entities/custom-base.entity';
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Country } from '../../utility/entities/country.entity';
import { State } from '../../utility/entities/state.entity';

export type GenderTypes = 'male' | 'female';

@Entity({ name: 'users' })
export class User extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 191 })
  firstname: string;

  @Column({ type: 'varchar', length: 191 })
  lastname: string;

  @Column({ type: 'varchar', length: 191, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 191, select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: ['male', 'female'],
    default: 'male',
  })
  gender: GenderTypes;

  @Column({ type: 'varchar', length: 191, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  address: string;

  @ManyToOne(() => State, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: State;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ type: 'int', default: 1 })
  status: number;

  fullname: string;

  @AfterLoad()
  getName() {
    this.fullname = `${this.firstname} ${this.lastname}`;
  }
}
