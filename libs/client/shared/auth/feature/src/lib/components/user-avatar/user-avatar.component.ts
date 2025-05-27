import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { UserStore } from '@lob/client/shared/auth/data-access';

@Component({
  selector: 'client-shared-auth-feature-user-avatar',
  imports: [NgOptimizedImage, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div (click)="changeSignInStatus()">
      @if (userContent(); as userContent) {
        @if (isAvatarImageError()) {
          <span>{{ userContent }}</span>
        } @else {
          <img class="rounded-lg" [ngSrc]="userContent" width="48" height="48" (error)="isAvatarImageError.set(true)" />
        }
      } @else {
        <p-button icon="fa-solid fa-user" [rounded]="true" [outlined]="true" />
      }
    </div>
  `
})
export class UserAvatarComponent {
  private readonly userStoreService = inject(UserStore);
  private readonly isSignedIn = this.userStoreService.isUserSignedIn;

  protected readonly isAvatarImageError = signal(false);

  protected userContent = computed(() => {
    const userData = this.userStoreService.userData();
    if (this.isAvatarImageError()) {
      return userData?.name?.split(' ')?.[0];
    } else {
      if (userData) {
        return userData.pictureUrl;
      }
      return null;
    }
  });

  protected changeSignInStatus() {
    if (this.isSignedIn()) {
      this.userStoreService.logUserOut();
    } else {
      this.userStoreService.signUserIn(false);
    }
  }
}
