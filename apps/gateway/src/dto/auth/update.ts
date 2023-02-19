export class UpdateUserDto {
  firstName: string;
  lastName: string;
  title?: string;
  email?: string;
  password?: string;
}

export class UpdateUserAvatarDto {
  avatar: string;
}
