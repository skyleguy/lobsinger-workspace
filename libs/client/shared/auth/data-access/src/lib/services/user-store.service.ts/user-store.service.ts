import { computed, effect, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';

import { User } from '@lob/client/shared/auth/data';
import { FirebaseAppStore } from '@lob/client/shared/firebase/data-access';
import { AjaxState } from '@lob/shared/data-management/data';
import { createAjaxState } from '@lob/shared/data-management/util';

import { GoogleAuthProviderService } from '../google-auth-provider/google-auth-provider.service';

interface UserState {
  user: AjaxState<User | null, Error>;
  hasAttemptedSignIn: boolean;
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<UserState>({
    user: createAjaxState(null, false),
    hasAttemptedSignIn: false
  }),
  withMethods((store, googleAuthProviderService = inject(GoogleAuthProviderService), firebaseAppStore = inject(FirebaseAppStore)) => ({
    async signUserIn(isSilent: boolean) {
      const firebaseApp = firebaseAppStore.firebaseApp()?.data;
      if (firebaseApp) {
        const signInMethod = isSilent ? googleAuthProviderService.silentSignIn(firebaseApp) : googleAuthProviderService.signIn(firebaseApp);
        try {
          const result = await signInMethod;
          patchState(store, {
            user: createAjaxState(result),
            hasAttemptedSignIn: true
          });
        } catch (e) {
          patchState(store, {
            user: createAjaxState(null, false, e as Error),
            hasAttemptedSignIn: true
          });
        }
      }
    },
    async logUserOut() {
      try {
        googleAuthProviderService.signOut();
        patchState(store, {
          user: createAjaxState(null)
        });
      } catch (e) {
        console.error(`Failed to sign out user due to: ${JSON.stringify(e)}`);
      }
    }
  })),
  withComputed((store) => ({
    isUserSignedIn: computed(() => store.hasAttemptedSignIn() && !!store.user()?.data && !store.user().loading),
    userData: computed(() => store.user()?.data),
    userLoading: computed(() => store.user()?.loading),
    userError: computed(() => store.user()?.error)
  })),
  withHooks({
    onInit(store, firebaseAppStore = inject(FirebaseAppStore)) {
      effect(() => {
        const firebaseApp = firebaseAppStore.firebaseApp()?.data;
        if (firebaseApp) {
          store.signUserIn(true);
        }
      });
    }
  })
);
