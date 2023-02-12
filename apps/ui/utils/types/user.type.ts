export type Profile = {
  avatar: string;
  title: string;
  firstName: string;
  lastName: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  created: string;
  updated: string;
  profile: Profile;
  role: {
    id: string;
    title: RoleTitle;
  };
};

export enum RoleTitle {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

export type SigningInput = {
  email: string;
  password: string;
};

export type UpdateUserInput = {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: 'bearer';
}
