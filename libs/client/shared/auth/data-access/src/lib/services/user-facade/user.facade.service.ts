import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FirebaseApp } from 'firebase/app';
import { combineLatest, filter, map } from 'rxjs';

import { User } from '@lob/client/shared/auth/data';

import * as fromUser from '../../+state';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  user$ = this.store.pipe(
    select(fromUser.selectUser),
    filter((user) => !!user),
    map((user) => user as User)
  );
  potentiallyNullUser$ = this.store.pipe(select(fromUser.selectUser));
  isLoading$ = this.store.pipe(select(fromUser.selectUserLoading));
  userError$ = this.store.pipe(select(fromUser.selectUserError));
  isUserSignedIn$ = this.store.pipe(select(fromUser.selectIsUserSignedIn));
  hasAttemptedSignOn$ = this.store.pipe(select(fromUser.selectHasAttemptedSignOn));
  isUserSignedInAfterAttempt$ = combineLatest([this.isUserSignedIn$, this.hasAttemptedSignOn$]).pipe(
    filter(([, hasAttempted]) => hasAttempted),
    map(([hasAttempted, isSignedIn]) => hasAttempted && isSignedIn)
  );

  constructor(private readonly store: Store<fromUser.UserState>) {}

  public signUserIn(app: FirebaseApp, isSilent: boolean) {
    this.store.dispatch(fromUser.actions.signUserIn({ app, isSilent }));
  }

  public logUserOut() {
    this.store.dispatch(fromUser.actions.logUserOut());
  }
}
