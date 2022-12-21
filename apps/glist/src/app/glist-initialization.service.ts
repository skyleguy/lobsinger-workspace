import { Injectable } from '@angular/core';
import { filter, firstValueFrom } from 'rxjs';

import { GoogleAuthProviderService } from '@lob/client/shared/auth/data-access';
import { FirebaseService } from '@lob/client/shared/firebase/data-access';

@Injectable({
  providedIn: 'root',
})
export class GlistInitializationService {
  constructor(
    private firebaseService: FirebaseService,
    private googleAuthService: GoogleAuthProviderService
  ) {}

  public async initializeApp() {
    const app = await firstValueFrom(
      this.firebaseService.app
        .asObservable()
        .pipe(filter((res) => res !== null))
    );
    if (app) {
      return await this.googleAuthService.signIn(app);
    } else {
      throw new Error('App could not be initialized!');
    }
  }
}
