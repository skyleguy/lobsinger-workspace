import { Component, OnDestroy, signal } from '@angular/core';

import { SubSinker } from '@lob/client/shared/lifecycle-management/data';
import { ComponentState } from '@lob/shared/data-management/data';

@Component({
  template: ''
})
export abstract class AbstractSubscriptionComponent implements OnDestroy {
  componentState = signal<ComponentState>(ComponentState.LOADING);
  sub: SubSinker = new SubSinker();

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected setLoadingState(): void {
    this.componentState.set(ComponentState.LOADING);
  }

  protected setErrorState(): void {
    this.componentState.set(ComponentState.ERROR);
  }

  protected setNoDataState(): void {
    this.componentState.set(ComponentState.NO_DATA);
  }

  protected setDataState(): void {
    this.componentState.set(ComponentState.DATA);
  }
}
