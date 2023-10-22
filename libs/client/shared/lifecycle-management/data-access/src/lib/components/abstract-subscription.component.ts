import { Component, OnDestroy } from '@angular/core';

import { SubSinker } from '@lob/client/shared/lifecycle-management/data';
import { ComponentState } from '@lob/shared/data-management/data';

@Component({
  template: ''
})
export abstract class AbstractSubscriptionComponent implements OnDestroy {
  componentState!: ComponentState;
  sub: SubSinker = new SubSinker();

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected setLoadingState(): void {
    this.componentState = ComponentState.LOADING;
  }

  protected setErrorState(): void {
    this.componentState = ComponentState.ERROR;
  }

  protected setNoDataState(): void {
    this.componentState = ComponentState.NO_DATA;
  }

  protected setDataState(): void {
    this.componentState = ComponentState.DATA;
  }
}
