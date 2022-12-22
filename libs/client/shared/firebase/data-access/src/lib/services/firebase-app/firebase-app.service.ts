import { Inject, Injectable } from '@angular/core';
import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { BehaviorSubject, filter, Observable } from 'rxjs';

import { FirebaseOptionsToken } from '@lob/client/shared/firebase/data';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAppService {
  app: FirebaseApp | null = null;
  appSubject: BehaviorSubject<FirebaseApp | null> = new BehaviorSubject<FirebaseApp | null>(null);
  app$: Observable<FirebaseApp> = this.appSubject.asObservable().pipe(filter((app) => app !== null)) as Observable<FirebaseApp>;

  constructor(@Inject(FirebaseOptionsToken) options: FirebaseOptions) {
    this.initializeApp(options);
  }

  private initializeApp(options: FirebaseOptions): void {
    this.appSubject.next(initializeApp(options));
  }
}
