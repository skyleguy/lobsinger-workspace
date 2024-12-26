import { Component, inject } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { UserStore } from '@lob/client/shared/auth/data-access';

@Component({
  selector: 'client-shared-auth-feature-sign-in-button',
  standalone: true,
  imports: [MatIcon, MatFabButton],
  template: `
    <button mat-fab extended (click)="logIn()">
      <mat-icon>login</mat-icon>
      Log In
    </button>
  `
})
export class SignInButtonComponent {
  private readonly userStoreService = inject(UserStore);

  protected logIn() {
    this.userStoreService.signUserIn(false);
  }
}
