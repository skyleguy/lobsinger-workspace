import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

import { AjaxState } from '@lob/shared/data-management/data';
import { createAjaxState } from '@lob/shared/data-management/util';

import { FirebaseAppService } from '../firebase-app/firebase-app.service';

interface FirebaseAppState {
  firebaseApp: AjaxState<FirebaseApp | null, Error>;
  isLocalFunctionEmulation: boolean;
}

export const FirebaseAppStore = signalStore(
  { providedIn: 'root' },
  withState<FirebaseAppState>({
    firebaseApp: createAjaxState<FirebaseApp | null>(null),
    isLocalFunctionEmulation: true
  }),
  withMethods((store, firebaseAppService = inject(FirebaseAppService)) => ({
    initializeApp() {
      try {
        const firebaseApp = firebaseAppService.initializeAppSync();
        console.log(firebaseApp.name, firebaseApp.options.projectId, firebaseApp.options.authDomain);
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
    }),
    functions: computed(() => {
      const firebaseApp = store.firebaseApp()?.data;
      if (firebaseApp) {
        const functions = getFunctions(firebaseApp);
        if (store.isLocalFunctionEmulation()) {
          connectFunctionsEmulator(functions, '127.0.0.1', 5001);
        }
        return functions;
      }
      return null;
    })
  }))
);
