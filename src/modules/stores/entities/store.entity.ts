import { CustomBaseEntity } from '../../../common/entities/custom-base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Country } from '../../utility/entities/country.entity';
import { State } from '../../utility/entities/state.entity';

@Entity({ name: 'stores' })
export class Store extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 191 })
  name: string;

  @Column({ type: 'varchar', length: 191 })
  address: string;

  @Column({ type: 'varchar', length: 191 })
  city: string;

  @ManyToOne(() => State, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: State;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ type: 'varchar', length: 191 })
  location: string;
}
