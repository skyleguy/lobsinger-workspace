import { Injectable } from '@angular/core';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  Auth,
  UserInfo,
} from 'firebase/auth';
import { from, map, Observable, of } from 'rxjs';

import { AuthProvider, User } from '@lob/client/shared/auth/data';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthProviderService implements AuthProvider {
  auth!: Auth;

  public signIn(): Observable<User> {
    if (!this.auth) {
      const provider = new GoogleAuthProvider();
      this.auth = getAuth();
      return from(signInWithPopup(this.auth, provider)).pipe(
        map((signInResponse) => this.mapToUser(signInResponse.user))
      );
    }
    let currentUser: User;
    if (this.auth.currentUser) {
      currentUser = this.mapToUser(this.auth.currentUser);
      return of(currentUser);
    }
    throw new Error('Unable to sign in user.');
  }

  public signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  private mapToUser(providedUser: UserInfo): User {
    return {
      name: providedUser?.displayName ?? '',
      pictureUrl: providedUser?.photoURL ?? '',
      email: providedUser?.email ?? '',
      id: providedUser?.uid,
    };
  }
}
