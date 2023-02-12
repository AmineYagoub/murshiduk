export class UpdateUserDto {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
}

export class UpdateUserAvatarDto {
  avatar: string;
}
