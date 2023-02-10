export class CreateContactDto {
  name: string;
  phone: string;
  phoneCode: string;
  country?: string;
  flightTimeStart?: string | Date;
  flightTimeEnd?: string | Date;
  adults?: number;
  children?: number;
  details?: string;
}

export class CreateContactNoteDto {
  authorId: string;
  content: string;
}
