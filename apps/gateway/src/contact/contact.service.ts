import { Injectable } from '@nestjs/common';
import { Contact, Prisma } from '@prisma/client';
import { PrismaService } from '../app/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async contact(
    contactWhereUniqueInput: Prisma.ContactWhereUniqueInput
  ): Promise<Contact | null> {
    return this.prisma.contact.findUnique({
      where: contactWhereUniqueInput,
      include: {
        notes: { include: { author: { select: { profile: true } } } },
      },
    });
  }

  async contacts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ContactWhereUniqueInput;
    where?: Prisma.ContactWhereInput;
    orderBy?: Prisma.ContactOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const data = await this.prisma.$transaction([
      this.prisma.contact.count({ where }),
      this.prisma.contact.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        select: {
          id: true,
          name: true,
          phone: true,
          phoneCode: true,
          country: true,
          created: true,
          flightTimeStart: true,
          flightTimeEnd: true,
          status: true,
        },
      }),
    ]);
    return {
      total: data[0],
      data: data[1],
    };
  }

  async createContact(data: Prisma.ContactCreateInput) {
    return this.prisma.contact.create({
      data,
    });
  }

  async createContactNote(data: Prisma.ContactNotesCreateInput) {
    return this.prisma.contactNotes.create({
      data,
      include: { author: { select: { profile: true } } },
    });
  }

  async deleteContactNote(where: Prisma.ContactNotesWhereUniqueInput) {
    return this.prisma.contactNotes.delete({
      where,
    });
  }

  async updateContact(params: {
    where: Prisma.ContactWhereUniqueInput;
    data: Prisma.ContactUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.contact.update({
      data,
      where,
    });
  }

  async deleteContact(where: Prisma.ContactWhereUniqueInput) {
    return this.prisma.contact.delete({
      where,
    });
  }
}
