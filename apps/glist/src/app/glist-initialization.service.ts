import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { firstValueFrom } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { FirebaseAppService } from '@lob/client/shared/firebase/data-access';

@Injectable({
  providedIn: 'root'
})
export class GlistInitializationService {
  public app!: FirebaseApp;
  constructor(private firebaseAppService: FirebaseAppService, private userFacadeService: UserFacadeService) {}

  public async initializeApp() {
    this.app = await firstValueFrom(this.firebaseAppService.app$);
    if (this.app) {
      this.userFacadeService.signUserIn(this.app, true);
    } else {
      throw new Error('App could not be initialized!');
    }
  }
}
