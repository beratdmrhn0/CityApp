import type { AuthResponse, IAuthService, RegisterData } from '@/services/api/auth';
import { authMockDb } from '@/mocks/auth';
import type { User } from '@/types/user';

function assertEmail(email: string) {
  const trimmed = email.trim();
  if (!trimmed) throw new Error('E-posta zorunludur.');
  // Basit email kontrolü (prod'da daha sıkı validation Zod ile yapılacak)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) throw new Error('Geçerli bir e-posta girin.');
  return trimmed;
}

function assertPassword(password: string) {
  if (!password) throw new Error('Şifre zorunludur.');
  if (password.length < 6) throw new Error('Şifre en az 6 karakter olmalıdır.');
  return password;
}

export class MockAuthService implements IAuthService {
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<AuthResponse> {
    const safeEmail = assertEmail(email);
    const safePassword = assertPassword(password);

    const stored = authMockDb.findUserByEmail(safeEmail);
    if (!stored) throw new Error('Kullanıcı bulunamadı.');
    if (stored.password !== safePassword) throw new Error('E-posta veya şifre hatalı.');

    const { password: _pw, ...user } = stored;
    this.currentUser = user;
    return authMockDb.toSession(user, 'authenticated');
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const safeEmail = assertEmail(data.email);
    const safePassword = assertPassword(data.password);

    const exists = authMockDb.findUserByEmail(safeEmail);
    if (exists) throw new Error('Bu e-posta ile kayıtlı bir kullanıcı var.');

    const created = authMockDb.createUser({
      email: safeEmail,
      password: safePassword,
      displayName: data.displayName?.trim() || undefined,
    });
    const { password: _pw, ...user } = created;
    this.currentUser = user;
    return authMockDb.toSession(user, 'authenticated');
  }

  async loginAsGuest(): Promise<AuthResponse> {
    const guest: User = {
      id: `guest_${Math.random().toString(16).slice(2)}`,
      email: 'guest@cityapp.local',
      displayName: 'Misafir',
      premium: false,
    };
    this.currentUser = guest;
    return authMockDb.toSession(guest, 'guest');
  }

  async logout(): Promise<void> {
    this.currentUser = null;
  }

  async forgotPassword(email: string): Promise<void> {
    const safeEmail = assertEmail(email);
    const stored = authMockDb.findUserByEmail(safeEmail);
    if (!stored) throw new Error('Bu e-posta ile kayıtlı kullanıcı bulunamadı.');
    // Mock: gerçek sistemde email gönderilir.
    return;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  async refreshToken(): Promise<string> {
    // Mock: gerçek sistemde refresh token flow olur.
    if (!this.currentUser) throw new Error('Oturum bulunamadı.');
    return `t_${Math.random().toString(16).slice(2)}`;
  }
}

