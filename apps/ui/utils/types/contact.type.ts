import { OrderByType } from './blog.type';
import { User } from './user.type';

export type Note = {
  content: string;
  author: User;
  created: string | Date;
};

export enum ContactStatus {
  NEW = 'NEW',
  OPEN = 'OPEN', // Positive but need some time
  OPEN_DEAL = 'OPEN_DEAL', // Positive and redy to recieve the deal
  CONNECTED = 'CONNECTED', // Accept the deal and become a custommer
  NEGATIVE = 'NEGATIVE', // Not intersted
}

export type Contact = {
  id: string;
  name: string;
  phone: string;
  phoneCode: string;
  country: string;
  flightTimeStart: string | Date;
  flightTimeEnd: string | Date;
  adults: number;
  children: number;
  details: string;
  notes: Note[];
  status: ContactStatus;
  created: string;
  updated: string;
};

export type ContactCreateInput = {
  name?: string;
  phone?: string;
  phoneCode?: string;
  country?: string;
  flightTimeStart?: string | Date;
  flightTimeEnd?: string | Date;
  adults?: number;
  children?: number;
  details?: string;
};

export type ContactNoteCreateInput = {
  authorId: string;
  contactId: string;
  content: string;
};

export type ContactDataIndex = keyof Contact;

export const ContactFields: { [P in ContactDataIndex]: P } = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  phoneCode: 'phoneCode',
  country: 'country',
  flightTimeStart: 'flightTimeStart',
  flightTimeEnd: 'flightTimeEnd',
  adults: 'adults',
  children: 'children',
  details: 'details',
  notes: 'notes',
  status: 'status',
  created: 'created',
  updated: 'updated',
};

export type WhereContactParams = {
  search?: string;
};
export type OrderContactByParams = {
  created?: OrderByType;
  updated?: OrderByType;
};

export interface ContactPaginationDto {
  skip: number;
  take: number;
  where?: WhereContactParams;
  orderBy?: OrderContactByParams;
}

export interface ContactResponse {
  total: number;
  data: Contact[];
}
