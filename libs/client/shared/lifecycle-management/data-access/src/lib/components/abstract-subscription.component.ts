import { Component, OnDestroy } from '@angular/core';

import { SubSinker } from '@lob/client/shared/lifecycle-management/data';

@Component({
  template: ''
})
export abstract class AbstractSubscriptionComponent implements OnDestroy {
  sub: SubSinker = new SubSinker();

  ngOnDestroy(): void {
    console.log('destroyed');
    this.sub.unsubscribe();
  }
}
