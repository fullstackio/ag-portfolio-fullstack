export type Role = 'admin' | 'editor' | 'viewer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export function hasRole(user: AuthUser | null | undefined, allowed: Role[]): boolean {
  if (!user) return false;
  return allowed.includes(user.role);
}
