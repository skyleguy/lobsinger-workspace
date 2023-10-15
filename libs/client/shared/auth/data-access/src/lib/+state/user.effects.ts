import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, of, switchMap } from 'rxjs';

import * as fromUser from './user.slice';

import { GoogleAuthProviderService } from '../services';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private googleAuthProviderService: GoogleAuthProviderService) {}

  signUserIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.actions.signUserIn),
      switchMap(({ payload }) =>
        from(
          payload.isSilent ? this.googleAuthProviderService.silentSignIn(payload.app) : this.googleAuthProviderService.signIn(payload.app)
        ).pipe(
          switchMap((res) => {
            if (res) {
              return of(fromUser.actions.signUserInSuccess(res));
            } else {
              return of(fromUser.actions.silentSignInError());
            }
          }),
          catchError((err) => of(fromUser.actions.signUserInError(err)))
        )
      )
    )
  );

  logUserOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromUser.actions.logUserOut),
        switchMap(() => this.googleAuthProviderService.signOut())
      ),
    { dispatch: false }
  );
}
