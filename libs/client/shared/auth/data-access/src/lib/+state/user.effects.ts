import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, of, switchMap } from 'rxjs';

import * as fromUser from './user.slice';

import { GoogleAuthProviderService } from '../services';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private googleAuthProviderService: GoogleAuthProviderService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUser.actions.getUser),
      switchMap(({ payload }) =>
        from(this.googleAuthProviderService.signIn(payload.app)).pipe(
          switchMap((res) => of(fromUser.actions.getUserSuccess(res))),
          catchError((err) => of(fromUser.actions.getUserError(err)))
        )
      )
    )
  );
}
