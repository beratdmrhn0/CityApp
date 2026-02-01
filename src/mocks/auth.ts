import type { AuthSession, User } from '@/types/user';

type StoredUser = User & { password: string };

const users: StoredUser[] = [
  {
    id: 'u_demo',
    email: 'demo@cityapp.dev',
    displayName: 'Demo Kullanıcı',
    premium: false,
    password: 'demo1234',
  },
];

export const authMockDb = {
  findUserByEmail(email: string) {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
  },
  createUser(data: { email: string; password: string; displayName?: string }) {
    const user: StoredUser = {
      id: `u_${Math.random().toString(16).slice(2)}`,
      email: data.email,
      displayName: data.displayName,
      premium: false,
      password: data.password,
    };
    users.push(user);
    return user;
  },
  toSession(user: User, mode: AuthSession['mode']): AuthSession {
    return {
      token: `t_${Math.random().toString(16).slice(2)}`,
      user,
      mode,
    };
  },
};

