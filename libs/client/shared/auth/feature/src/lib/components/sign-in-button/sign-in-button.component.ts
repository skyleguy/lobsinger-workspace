import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { UserStore } from '@lob/client/shared/auth/data-access';

@Component({
  selector: 'client-shared-auth-feature-sign-in-button',
  imports: [ButtonModule],
  template: `
    <p-button [rounded]="true" severity="primary" label="Log In" icon="fa-solid fa-right-to-bracket" (click)="logIn()"> </p-button>
  `
})
export class SignInButtonComponent {
  private readonly userStoreService = inject(UserStore);

  protected logIn() {
    this.userStoreService.signUserIn(false);
  }
}
