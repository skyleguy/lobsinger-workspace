import { Subscription } from 'rxjs';

export class SubSinker {
  #subs: Subscription[] = [];

  set sink(sub: Subscription) {
    this.#subs.push(sub);
  }

  public unsubscribe(): void {
    this.#subs.forEach((sub) => sub.unsubscribe());
    this.#subs = [];
  }
}
