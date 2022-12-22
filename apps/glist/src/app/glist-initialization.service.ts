import { Injectable } from '@angular/core';
import { filter, firstValueFrom } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';
import { FirebaseService } from '@lob/client/shared/firebase/data-access';

@Injectable({
  providedIn: 'root'
})
export class GlistInitializationService {
  constructor(private firebaseService: FirebaseService, private userFacadeService: UserFacadeService) {}

  public async initializeApp() {
    const app = await firstValueFrom(this.firebaseService.app.asObservable().pipe(filter((res) => res !== null)));
    if (app) {
      return this.userFacadeService.getUser(app);
    } else {
      throw new Error('App could not be initialized!');
    }
  }
}
