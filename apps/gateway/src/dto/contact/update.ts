import { ContactStatus } from '@prisma/client';

export class UpdateContactDto {
  status: ContactStatus;
}
