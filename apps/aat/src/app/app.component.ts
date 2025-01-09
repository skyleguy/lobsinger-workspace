import { Component, computed, effect, inject, untracked, viewChild } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { UserStore } from '@lob/client/shared/auth/data-access';
import { FirebaseAppStore } from '@lob/client/shared/firebase/data-access';
import { AppContainerComponent } from '@lob/client/shared/layout/ui';
import { SignInButtonComponent, UserAvatarComponent } from '@lob/client-shared-auth-feature';

@Component({
    imports: [RouterModule, AppContainerComponent, MatToolbar, UserAvatarComponent, SignInButtonComponent, MatSnackBarModule],
    selector: 'aat-root',
    template: `
    <shared-layout-ui-app-container [isSidebarAvailable]="false" [isMainBodyScrollable]="false">
      <ng-container nav>
        <mat-toolbar color="primary">
          <span nav>Advantage Asset Tracker</span>
          <span class="flex grow shrink"></span>
          <client-shared-auth-feature-user-avatar></client-shared-auth-feature-user-avatar>
        </mat-toolbar>
      </ng-container>
      <ng-container main-content>
        <div class="w-full h-full overflow-auto p-3">
          <router-outlet></router-outlet>
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

  protected isNotSignedIn = computed(
    () => this.userStore.hasAttemptedSignIn() && !this.userStore.userData() && !this.userStore.userLoading()
  );
  protected isUnauthorized = computed(() => this.userStore.isUserSignedIn() && !this.isValidEmail(this.userStore.userData()?.email ?? ''));

  constructor() {
    this.firebaseAppStore.initializeApp();
    effect(() => {
      this.handleNotSignedIn();
    });

    effect(() => {
      this.handleUnauthorized();
    });
  }

  private handleNotSignedIn() {
    const isNotSignedIn = this.isNotSignedIn();
    this.handleErrorSetting(
      isNotSignedIn,
      'error',
      'Please Sign In',
      'Signing in with a valid advantage email is required to use the Advantage Asset Tracker'
    );
  }

  private handleUnauthorized() {
    const isUnauthorized = this.isUnauthorized();
    this.handleErrorSetting(
      isUnauthorized,
      'error',
      'Unauthorized',
      'You have not signed in with a valid account. Please reach out to the owner for information on how to gain access'
    );
  }

  private handleErrorSetting(isSettingError: boolean, icon: 'error' | 'warning', primaryMessage: string, secondaryMessage?: string) {
    untracked(() => {
      const appContainer = this.appContainer();
      if (isSettingError) {
        appContainer?.setError({
          icon,
          primaryMessage,
          secondaryMessage
        });
      } else {
        this.appContainer()?.clearError();
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
