import { create } from 'zustand';

import type { AuthSession, User } from '@/types/user';
import { STORAGE_KEYS } from '@/utils/constants';
import { secureStorage } from '@/services/storage/secure';

type AuthState = {
  status: 'unknown' | 'authenticated' | 'guest' | 'unauthenticated';
  token: string | null;
  user: User | null;
  hydrating: boolean;

  setSession: (session: AuthSession) => Promise<void>;
  clearSession: () => Promise<void>;
  hydrate: () => Promise<void>;
};

type PersistedSession = AuthSession;

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'unknown',
  token: null,
  user: null,
  hydrating: false,

  async setSession(session) {
    set({
      token: session.token,
      user: session.user,
      status: session.mode === 'guest' ? 'guest' : 'authenticated',
    });
    await secureStorage.setJson<PersistedSession>(STORAGE_KEYS.authSession, session);
  },

  async clearSession() {
    set({ token: null, user: null, status: 'unauthenticated' });
    await secureStorage.deleteItem(STORAGE_KEYS.authSession);
  },

  async hydrate() {
    if (get().hydrating) return;
    set({ hydrating: true });
    try {
      const session = await secureStorage.getJson<PersistedSession>(STORAGE_KEYS.authSession);
      if (!session) {
        set({ status: 'unauthenticated', token: null, user: null });
        return;
      }
      set({
        token: session.token,
        user: session.user,
        status: session.mode === 'guest' ? 'guest' : 'authenticated',
      });
    } finally {
      set({ hydrating: false });
    }
  },
}));

