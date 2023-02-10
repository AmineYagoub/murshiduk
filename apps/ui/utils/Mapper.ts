import { ContactStatus } from './types';

export type Mapper<T> = {
  value: T;
  label: string;
};
export enum RoleTitle {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER',
}

export const rolesMappedTypes: Mapper<RoleTitle>[] = [
  {
    label: 'المدير العام',
    value: RoleTitle.Admin,
  },
  {
    label: 'المشرف',
    value: RoleTitle.Moderator,
  },

  {
    label: 'user',
    value: RoleTitle.User,
  },
];

export const contactStatusMappedTypes: Mapper<ContactStatus>[] = [
  {
    label: 'جديد',
    value: ContactStatus.NEW,
  },
  {
    label: 'مفتوح',
    value: ContactStatus.OPEN,
  },
  {
    label: 'إيجابي',
    value: ContactStatus.OPEN_DEAL,
  },
  {
    label: 'عميل',
    value: ContactStatus.CONNECTED,
  },
  {
    label: 'سلبي',
    value: ContactStatus.NEGATIVE,
  },
];

export const contactStatusMappedColors = {
  [ContactStatus.NEW]: 'green',
  [ContactStatus.OPEN]: 'blue',
  [ContactStatus.OPEN_DEAL]: 'cyan',
  [ContactStatus.CONNECTED]: 'green',
  [ContactStatus.NEGATIVE]: 'red',
};

export const getMapperLabel = <T>(mapper: Mapper<T>[], val: T) =>
  mapper.find((m) => m.value === val)?.label;
