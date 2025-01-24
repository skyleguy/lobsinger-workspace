import { Component, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { UserStore } from '@lob/client/shared/auth/data-access';
import { FirebaseAppStore } from '@lob/client/shared/firebase/data-access';
import { AppContainerComponent, ErrorConfig } from '@lob/client/shared/layout/ui';
import { SignInButtonComponent, UserAvatarComponent } from '@lob/client-shared-auth-feature';

@Component({
  imports: [RouterModule, AppContainerComponent, MatToolbar, UserAvatarComponent, SignInButtonComponent, MatSnackBarModule],
  selector: 'aat-root',
  template: `
    <shared-layout-ui-app-container [isSidebarAvailable]="false" [isMainBodyScrollable]="false">
      <ng-container nav>
        <mat-toolbar color="primary">
          <span nav>PowrQuest</span>
          <span class="flex grow shrink"></span>
          <client-shared-auth-feature-user-avatar></client-shared-auth-feature-user-avatar>
        </mat-toolbar>
      </ng-container>
      <ng-container main-content>
        <div class="w-full h-full overflow-auto p-3">
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
  private readonly allowedExactEmails = ['kylelobsinger@gmail.com'];
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
        icon: 'error',
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
        icon: 'error',
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
      this.allowedEmailPieces.some((allowedEmailPiece) => email.includes(allowedEmailPiece)) ||
      this.allowedExactEmails.some((allowedEmail) => email === allowedEmail)
    );
  }
}
