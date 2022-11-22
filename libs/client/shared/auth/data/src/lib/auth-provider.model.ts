import { Observable } from 'rxjs';

import { User } from './user.model';

export interface AuthProvider {
  signIn(): Observable<User>;
  signOut(): void;
}
