import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// import { ClientSharedMobileUtilitiesDataAccessModule } from '../../client-shared-mobile-utilities-data-access.module';

@Injectable({
  providedIn: 'root'
})
export class UiVisibilityService {
  #visibilityMap: Record<string, boolean> = {};
  visibilityMap$: BehaviorSubject<Record<string, boolean>> = new BehaviorSubject(this.#visibilityMap);

  public setVisibility(key: string, isVisible = true): void {
    this.#visibilityMap[key] = isVisible;
    this.visibilityMap$.next(this.#visibilityMap);
  }
}
