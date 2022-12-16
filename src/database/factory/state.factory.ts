import { Factory } from '@concepta/typeorm-seeding';
import { State } from '../../modules/utility/entities/state.entity';

export class StateFactory extends Factory<State> {
  protected async entity(): Promise<State> {
    const state = new State();
    state.name = '';
    state.code = '';
    state.country = null;
    return state;
  }
}
