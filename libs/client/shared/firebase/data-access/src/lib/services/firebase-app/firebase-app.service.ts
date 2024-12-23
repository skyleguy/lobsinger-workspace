import { Inject, Injectable, signal, WritableSignal } from '@angular/core';
import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';

import { FirebaseOptionsToken } from '@lob/client/shared/firebase/data';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAppService {
  app: FirebaseApp | null = null;
  appSubject: BehaviorSubject<FirebaseApp | null> = new BehaviorSubject<FirebaseApp | null>(null);
  app$: Observable<FirebaseApp> = this.appSubject.asObservable().pipe(filter((app) => app !== null)) as Observable<FirebaseApp>;
  readonly firebaseApp: WritableSignal<FirebaseApp | null> = signal(null);

  constructor(@Inject(FirebaseOptionsToken) private readonly options: FirebaseOptions) {}

  public initializeApp() {
    const app = initializeApp(this.options);
    this.appSubject.next(app);
    return of(app);
  }

  public initializeAppSync() {
    return initializeApp(this.options);
  }
}
