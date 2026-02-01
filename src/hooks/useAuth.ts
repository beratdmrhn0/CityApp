import { useMemo } from 'react';

import type { RegisterData } from '@/services/api/auth';
import { MockAuthService } from '@/services/api/mockAuthService';
import { useAuthStore } from '@/stores/authStore';

const authServiceSingleton = new MockAuthService();

export function useAuth() {
  const { status, user, token, hydrating, setSession, clearSession, hydrate } = useAuthStore();

  const service = useMemo(() => authServiceSingleton, []);

  return {
    // state
    status,
    user,
    token,
    hydrating,
    isAuthenticated: status === 'authenticated' || status === 'guest',
    isGuest: status === 'guest',

    // actions
    hydrate,
    async login(email: string, password: string) {
      const session = await service.login(email, password);
      await setSession(session);
    },
    async register(data: RegisterData) {
      const session = await service.register(data);
      await setSession(session);
    },
    async loginAsGuest() {
      const session = await service.loginAsGuest();
      await setSession(session);
    },
    async logout() {
      await service.logout();
      await clearSession();
    },
    async forgotPassword(email: string) {
      await service.forgotPassword(email);
    },
  };
}

