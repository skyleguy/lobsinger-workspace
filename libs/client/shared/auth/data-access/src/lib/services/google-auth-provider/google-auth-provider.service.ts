import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  Auth,
  UserInfo,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { from, Observable } from 'rxjs';

import { AuthProvider, User } from '@lob/client/shared/auth/data';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthProviderService implements AuthProvider {
  auth!: Auth;

  public async signIn(app?: FirebaseApp): Promise<User> {
    if (this.auth?.currentUser) {
      return this.mapToUser(this.auth.currentUser);
    } else {
      const auth = getAuth(app);
      await setPersistence(auth, browserLocalPersistence);
      this.auth = auth;
      if (!auth.currentUser) {
        const userCredential = await signInWithPopup(
          auth,
          new GoogleAuthProvider()
        );
        return this.mapToUser(userCredential.user);
      } else {
        return this.mapToUser(this.auth.currentUser);
      }
    }
  }

  public signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  private mapToUser(providedUser: UserInfo | null): User {
    if (!providedUser) {
      throw new Error('no user passed to mapper');
    }
    return {
      name: providedUser?.displayName ?? '',
      pictureUrl: providedUser?.photoURL ?? '',
      email: providedUser?.email ?? '',
      id: providedUser?.uid,
    };
  }
}
