import { Inject, Injectable } from '@angular/core';
import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

import { FirebaseOptionsToken } from '@lob/client/shared/firebase/data';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app: BehaviorSubject<FirebaseApp | null> =
    new BehaviorSubject<FirebaseApp | null>(null);

  constructor(@Inject(FirebaseOptionsToken) options: FirebaseOptions) {
    this.initializeApp(options);
  }

  private initializeApp(options: FirebaseOptions): void {
    this.app.next(initializeApp(options));
  }
}
