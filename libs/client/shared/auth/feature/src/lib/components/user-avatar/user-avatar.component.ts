import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { UserStore } from '@lob/client/shared/auth/data-access';

@Component({
  selector: 'client-shared-auth-feature-user-avatar',
  standalone: true,
  imports: [MatIcon, MatIconButton, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-icon-button (click)="changeSignInStatus()">
      @if (imageUrl(); as url) {
        <img class="rounded-avatar" [ngSrc]="url" width="48" height="48" />
      } @else {
        <mat-icon>person</mat-icon>
      }
    </button>
  `
})
export class UserAvatarComponent {
  private readonly userStoreService = inject(UserStore);
  private readonly isSignedIn = this.userStoreService.isUserSignedIn;

  protected imageUrl = computed(() => {
    const userData = this.userStoreService.userData();
    if (userData) {
      return userData.pictureUrl;
    }
    return null;
  });

  protected changeSignInStatus() {
    if (this.isSignedIn()) {
      this.userStoreService.logUserOut();
    } else {
      this.userStoreService.signUserIn(false);
    }
  }
}
