import { Component, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { ToastModule } from 'primeng/toast';

import { UserStore } from '@lob/client/shared/auth/data-access';
import { FirebaseAppStore } from '@lob/client/shared/firebase/data-access';
import { AppContainerComponent, ErrorConfig } from '@lob/client/shared/layout/ui';
import { UpdateService } from '@lob/client/shared/refresh/data-access';
import { SignInButtonComponent, UserAvatarComponent } from '@lob/client-shared-auth-feature';
import { ThemeTogglerComponent } from '@lob/client-shared-design-system-ui';

@Component({
  imports: [RouterModule, AppContainerComponent, UserAvatarComponent, SignInButtonComponent, ThemeTogglerComponent, ToastModule],
  selector: 'aat-root',
  template: `
    <shared-layout-ui-app-container [isSidebarAvailable]="false" [isMainBodyScrollable]="false">
      <ng-container nav>
        <h1 nav>PowrQuest</h1>
        <div class="flex items-center gap-3">
          <shared-theme-ui-theme-toggler></shared-theme-ui-theme-toggler>
          <client-shared-auth-feature-user-avatar></client-shared-auth-feature-user-avatar>
        </div>
      </ng-container>
      <ng-container main-content>
        <div class="w-full h-full overflow-auto">
          @if (isSignedIn() && isAuthorized()) {
            <router-outlet></router-outlet>
          }
        </div>
      </ng-container>
      <ng-container errorExtra>
        <client-shared-auth-feature-sign-in-button></client-shared-auth-feature-sign-in-button>
      </ng-container>
    </shared-layout-ui-app-container>
    <p-toast [breakpoints]="{ '920px': { width: '100%', right: '0', left: '0' } }" />
  `
})
export class AppComponent {
  private readonly firebaseAppStore = inject(FirebaseAppStore);
  private readonly updateService = inject(UpdateService);
  private readonly userStore = inject(UserStore);
  private readonly appContainer = viewChild(AppContainerComponent);
  private readonly allowedEmailPieces = ['@advantagenc.com'];
  private readonly notSignedInErrorConfig = signal<ErrorConfig | null>(null);
  private readonly unauthorizedErrorConfig = signal<ErrorConfig | null>(null);

  protected isSignedIn = this.userStore.isUserSignedIn;
  protected isAuthorized = signal<boolean | null>(null);

  constructor() {
    this.updateService.enableAutoUpdate();
    this.firebaseAppStore.initializeApp({
      firestoreOptions: { databaseId: 'advantage', isEmulating: false },
      functionOptions: { isEmulating: false }
    });
    effect(() => {
      this.handleNotSignedIn();
    });
    effect(() => {
      this.handleUnauthorized();
    });
    effect(() => {
      this.handleErrorConfigs();
    });
    effect(async () => {
      const email = this.userStore.userData()?.email;
      const db = this.firebaseAppStore.firestore();
      if (db && email) {
        const docRef = doc(db, 'aat-valid-users', email.toLowerCase());
        const docSnap = await getDoc(docRef);
        this.isAuthorized.set(
          (docSnap.exists() && docSnap.data()?.['isAllowed']) ||
            this.allowedEmailPieces.some((allowedEmailPiece) => email.toLowerCase().includes(allowedEmailPiece.toLowerCase()))
        );
      }
    });
  }

  private handleNotSignedIn() {
    const isNotSignedIn = !this.isSignedIn();
    if (isNotSignedIn && this.userStore.hasAttemptedSignIn()) {
      const notSignedInErrorConfig: ErrorConfig = {
        icon: 'fa-circle-exclamation',
        primaryMessage: 'Please Sign In',
        secondaryMessage: 'Signing in with a valid advantage email is required to use the Advantage Asset Tracker'
      };
      this.notSignedInErrorConfig.set(notSignedInErrorConfig);
    } else {
      this.notSignedInErrorConfig.set(null);
    }
  }

  private handleUnauthorized() {
    const isUnauthorized = this.isAuthorized() === false;
    if (isUnauthorized) {
      const unauthorizedErrorConfig: ErrorConfig = {
        icon: 'fa-circle-exclamation',
        primaryMessage: 'Unauthorized',
        secondaryMessage: 'You have not signed in with a valid account. Please reach out to the owner for information on how to gain access'
      };
      this.unauthorizedErrorConfig.set(unauthorizedErrorConfig);
    } else {
      this.unauthorizedErrorConfig.set(null);
    }
  }

  private handleErrorConfigs() {
    const currErrorConfig = this.notSignedInErrorConfig() || this.unauthorizedErrorConfig();
    untracked(() => {
      const appContainer = this.appContainer();
      if (currErrorConfig) {
        appContainer?.setError(currErrorConfig);
      } else {
        appContainer?.clearError();
      }
    });
  }
}
