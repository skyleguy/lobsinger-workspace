import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';

import { AjaxState } from '@lob/shared/data-management/data';
import { createAjaxState } from '@lob/shared/data-management/util';

import { FirebaseAppService } from '../firebase-app/firebase-app.service';

interface FirebaseAppState {
  firebaseApp: AjaxState<FirebaseApp | null, Error>;
}

export const FirebaseAppStore = signalStore(
  { providedIn: 'root' },
  withState<FirebaseAppState>({
    firebaseApp: createAjaxState<FirebaseApp | null>(null)
  }),
  withMethods((store, firebaseAppService = inject(FirebaseAppService)) => ({
    initializeApp() {
      try {
        const firebaseApp = firebaseAppService.initializeAppSync();
        patchState(store, {
          firebaseApp: createAjaxState(firebaseApp)
        });
      } catch (e) {
        patchState(store, {
          firebaseApp: createAjaxState(null, false, e as Error)
        });
      }
    }
  })),
  withComputed((store) => ({
    analytics: computed(() => {
      const firebaseApp = store.firebaseApp()?.data;
      if (firebaseApp) {
        return getAnalytics(firebaseApp);
      }
      return null;
    })
  }))
);
