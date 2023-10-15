import { User } from './user.model';

export interface AuthProvider {
  signIn(): Promise<User>;
  silentSignIn(): Promise<User | null>;
  signOut(): void;
}
