export type Mapper<T> = {
  value: T;
  text: string;
  label?: string;
};
export enum RoleTitle {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER',
}

export const rolesMappedTypes: Mapper<RoleTitle>[] = [
  {
    text: 'المدير العام',
    value: RoleTitle.Admin,
  },
  {
    text: 'المشرف',
    value: RoleTitle.Moderator,
  },

  {
    text: 'user',
    value: RoleTitle.User,
  },
];

export const getMapperLabel = <T>(mapper: Mapper<T>[], val: T) =>
  mapper.find((m) => m.value === val)?.text;
