import { Component } from '@angular/core';
import { Observable, filter } from 'rxjs';

import { AbstractSubscriptionComponent } from './abstract-subscription.component';

@Component({
    template: '',
    standalone: false
})
export abstract class AbstractRedirectComponent extends AbstractSubscriptionComponent {
  /**
   * an observable that will trigger a call to doRedirect when it emits a truthy value
   */
  redirectObservable$: Observable<boolean>;

  constructor(redirectObservable: Observable<boolean>) {
    super();
    this.redirectObservable$ = redirectObservable;
    this.respondToRedirectObservable();
  }

  protected respondToRedirectObservable() {
    this.sub.sink = this.redirectObservable$.pipe(filter((val) => val)).subscribe({
      next: () => {
        this.doRedirect();
      }
    });
  }

  abstract doRedirect(): void;
}
