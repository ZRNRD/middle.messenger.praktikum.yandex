import { Dictionary } from '../utils/types';

export class Store {
  private state: Dictionary = {};

  public getState() {
    return this.state;
  }

  public setState(newValue: any) {
    Object.assign(this.state, newValue);
  }
}

export default new Store();
