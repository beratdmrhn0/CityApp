export type User = {
  id: string;
  email: string;
  displayName?: string;
  premium?: boolean;
};

export type AuthSession = {
  token: string;
  user: User;
  mode: 'authenticated' | 'guest';
};

