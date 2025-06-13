import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

import { AjaxState } from '@lob/shared/data-management/data';
import { createAjaxState } from '@lob/shared/data-management/util';

import { FirebaseAppService } from '../firebase-app/firebase-app.service';

interface InitializeFirebaseAppOptions {
  firestoreOptions?: { databaseId?: string; isEmulating?: boolean };
  functionOptions?: { isEmulating?: boolean };
}
interface FirebaseAppState {
  firebaseApp: AjaxState<FirebaseApp | null, Error>;
  options: null | Partial<InitializeFirebaseAppOptions>;
}

export const FirebaseAppStore = signalStore(
  { providedIn: 'root' },
  withState<FirebaseAppState>({
    firebaseApp: createAjaxState<FirebaseApp | null>(null),
    options: null
  }),
  withMethods((store, firebaseAppService = inject(FirebaseAppService)) => ({
    initializeApp(options?: Partial<InitializeFirebaseAppOptions>) {
      try {
        const firebaseApp = firebaseAppService.initializeAppSync();
        console.log(firebaseApp.name, firebaseApp.options.projectId);
        patchState(store, {
          firebaseApp: createAjaxState(firebaseApp),
          options: options ?? {}
        });
      } catch (e) {
        console.log('Error initializing Firebase App:', e);
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
      const options = store.options();
      if (firebaseApp && options) {
        const functions = getFunctions(firebaseApp);
        if (options.functionOptions?.isEmulating) {
          connectFunctionsEmulator(functions, '127.0.0.1', 5001);
        }
        return functions;
      }
      return null;
    }),
    firestore: computed(() => {
      const firebaseApp = store.firebaseApp()?.data;
      const options = store.options();
      if (firebaseApp && options) {
        const databaseId = options.firestoreOptions?.databaseId ?? 'default';
        const firestore = getFirestore(firebaseApp, databaseId);
        if (options.firestoreOptions?.isEmulating) {
          connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
        }
        return firestore;
      }
      return null;
    })
  }))
);
