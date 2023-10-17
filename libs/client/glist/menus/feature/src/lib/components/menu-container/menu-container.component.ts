import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { AbstractRedirectComponent } from '@lob/client/shared/lifecycle-management/data-access';

@Component({
  selector: 'glist-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent extends AbstractRedirectComponent {
  constructor(private readonly router: Router, userFacadeService: UserFacadeService) {
    super(userFacadeService.isUserSignedInAfterAttempt$.pipe(map((isSignedIn) => !isSignedIn)));
  }

  doRedirect(): void {
    this.router.navigate(['dashboard']);
  }
}
