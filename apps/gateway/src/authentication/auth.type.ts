import { Profile, Role, User } from '@prisma/client';

export class JWTToken {
  accessToken: string;

  refreshToken: string;

  tokenType: 'bearer';

  nonce: string;
}

export interface UserModel extends User {
  role: Role;

  profile: Profile;
}
