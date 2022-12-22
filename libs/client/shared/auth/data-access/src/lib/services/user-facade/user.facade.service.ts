import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FirebaseApp } from 'firebase/app';
import { filter } from 'rxjs';

import * as fromUser from '../../+state';

@Injectable()
export class UserFacadeService {
  user$ = this.store.pipe(
    select(fromUser.selectUser),
    filter((user) => user.id.length > 0)
  );
  isLoading$ = this.store.pipe(select(fromUser.selectUserLoading));
  userError$ = this.store.pipe(select(fromUser.selectUserError));

  constructor(private readonly store: Store<fromUser.UserState>) {}

  public getUser(app?: FirebaseApp) {
    this.store.dispatch(fromUser.actions.getUser({ app }));
  }
}
