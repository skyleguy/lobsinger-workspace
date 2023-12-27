import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';

import * as fromFirebaseApp from './firebase-app.slice';

import { FirebaseAppService } from '../services/firebase-app/firebase-app.service';

@Injectable()
export class FirebaseAppEffects {
  constructor(
    private actions$: Actions,
    private firebaseAppService: FirebaseAppService
  ) {}

  getFirebaseApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromFirebaseApp.actions.getFirebaseApp),
      switchMap(() =>
        this.firebaseAppService.initializeApp().pipe(
          switchMap((res) => {
            return of(fromFirebaseApp.actions.getFirebaseAppSuccess(res));
          }),
          catchError((err) => of(fromFirebaseApp.actions.getFirebaseAppError(err)))
        )
      )
    )
  );
}
