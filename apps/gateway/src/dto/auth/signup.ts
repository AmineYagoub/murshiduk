import { SignInDto } from './signin';
import { RoleTitle } from '@prisma/client';

export class SignUpDto extends SignInDto {
  role: RoleTitle;
}
