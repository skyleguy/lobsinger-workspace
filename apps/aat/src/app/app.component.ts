import { Component, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserStore } from '@lob/client/shared/auth/data-access';
import { FirebaseAppStore } from '@lob/client/shared/firebase/data-access';
import { AppContainerComponent, ErrorConfig } from '@lob/client/shared/layout/ui';
import { ThemeTogglerComponent } from '@lob/client/shared/theme/ui';
import { SignInButtonComponent, UserAvatarComponent } from '@lob/client-shared-auth-feature';

@Component({
  imports: [RouterModule, AppContainerComponent, UserAvatarComponent, SignInButtonComponent, ThemeTogglerComponent],
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
  `
})
export class AppComponent {
  private readonly firebaseAppStore = inject(FirebaseAppStore);
  private readonly userStore = inject(UserStore);
  private readonly appContainer = viewChild(AppContainerComponent);
  private readonly allowedEmailPieces = ['@advantagenc.com'];
  private readonly allowedExactEmails = [
    'kylelobsinger@gmail.com',
    'msinclair1229@charter.net',
    'lancedmullins@gmail.com',
    'dave822634@icloud.com',
    'rjfuhrer27@gmail.com',
    'dtroskey@gmail.com',
    'lutrish17@gmail.com',
    'keithbmx@gmail.com',
    'Jim.AdvantageNC@gmail.com',
    'coco.advantagenc@gmail.com',
    'msinclair1229@charter.net',
    'chad.m.baker77@gmail.com',
    'frank@advantagenc.com'
  ];
  private readonly notSignedInErrorConfig = signal<ErrorConfig | null>(null);
  private readonly unauthorizedErrorConfig = signal<ErrorConfig | null>(null);

  protected isSignedIn = this.userStore.isUserSignedIn;
  protected isAuthorized = computed(() => this.userStore.isUserSignedIn() && this.isValidEmail(this.userStore.userData()?.email ?? ''));
  protected isUnauthorized = computed(() => this.userStore.isUserSignedIn() && !this.isValidEmail(this.userStore.userData()?.email ?? ''));

  constructor() {
    this.firebaseAppStore.initializeApp();
    effect(() => {
      this.handleNotSignedIn();
    });
    effect(() => {
      this.handleUnauthorized();
    });
    effect(() => {
      this.handleErrorConfigs();
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
    const isUnauthorized = this.isUnauthorized();
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

  private isValidEmail(email: string) {
    return (
      this.allowedEmailPieces.some((allowedEmailPiece) => email.toLowerCase().includes(allowedEmailPiece.toLowerCase())) ||
      this.allowedExactEmails.some((allowedEmail) => email.toLowerCase() === allowedEmail.toLowerCase())
    );
  }
}
