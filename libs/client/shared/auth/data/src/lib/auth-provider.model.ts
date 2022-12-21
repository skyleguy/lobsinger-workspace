import { User } from './user.model';

export interface AuthProvider {
  signIn(): Promise<User>;
  signOut(): void;
}
