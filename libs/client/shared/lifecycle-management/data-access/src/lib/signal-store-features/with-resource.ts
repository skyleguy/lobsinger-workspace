import { rxResource } from '@angular/core/rxjs-interop';
import { signalStoreFeature, withProps } from '@ngrx/signals';

export function withResource<T, R>(resource: typeof rxResource<T, R>) {
  return signalStoreFeature(
    withProps(() => ({
      resource
    }))
  );
}
