import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FirebaseApp } from 'firebase/app';
import { isNil } from 'lodash';
import { filter, map } from 'rxjs';

import * as fromFirebaseApp from '../+state';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAppFacadeService {
  app$ = this.store.pipe(
    select(fromFirebaseApp.selectAppData),
    filter((app) => !isNil(app)),
    map((app) => app as FirebaseApp)
  );

  appError$ = this.store.pipe(select(fromFirebaseApp.selectAppError));

  constructor(private readonly store: Store<fromFirebaseApp.FirebaseAppState>) {}

  getFirebaseApp() {
    this.store.dispatch(fromFirebaseApp.actions.getFirebaseApp());
  }
}
