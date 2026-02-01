import type { AuthSession, User } from '@/types/user';

export type RegisterData = {
  email: string;
  password: string;
  displayName?: string;
};

export type AuthResponse = AuthSession;

export interface IAuthService {
  login(email: string, password: string): Promise<AuthResponse>;
  register(data: RegisterData): Promise<AuthResponse>;
  logout(): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  refreshToken(): Promise<string>;
  loginAsGuest(): Promise<AuthResponse>;
}

