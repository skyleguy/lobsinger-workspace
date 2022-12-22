import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { FirebaseAppService } from '@lob/client/shared/firebase/data-access';

@Injectable({
  providedIn: 'root'
})
export class GlistInitializationService {
  constructor(private firebaseAppService: FirebaseAppService, private userFacadeService: UserFacadeService) {}

  public async initializeApp() {
    const app = await firstValueFrom(this.firebaseAppService.app$);
    if (app) {
      return this.userFacadeService.getUser(app);
    } else {
      throw new Error('App could not be initialized!');
    }
  }
}
