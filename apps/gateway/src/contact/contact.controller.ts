import {
  Put,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ContactService } from './contact.service';
import { WhereContactArgs } from '../dto/contact/pagination';
import { CreateContactDto, CreateContactNoteDto } from '../dto/contact/create';
import { UpdateContactDto } from '../dto/contact/update';
import { isPublic } from '../decorators/isPublic.decorator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get(':id')
  async getContactById(@Param('id') id: string) {
    return this.contactService.contact({ id });
  }

  @isPublic()
  @Post()
  async createContact(@Body() body: CreateContactDto) {
    return this.contactService.createContact(body);
  }

  @Put(':id')
  async updateContact(@Param('id') id: string, @Body() body: UpdateContactDto) {
    return this.contactService.updateContact({
      where: { id },
      data: body,
    });
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string) {
    return this.contactService.deleteContact({ id });
  }

  @Post(':id/note')
  async createContactNote(
    @Param('id') id: string,
    @Body() body: CreateContactNoteDto
  ) {
    const { authorId, content } = body;
    return this.contactService.createContactNote({
      author: {
        connect: {
          id: authorId,
        },
      },
      contact: {
        connect: {
          id,
        },
      },
      content,
    });
  }

  @Delete('note/:id')
  async deleteContactNote(@Param('id') id: string) {
    return this.contactService.deleteContactNote({ id });
  }

  @Get('filter')
  async getFilteredContacts(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('search', new DefaultValuePipe(undefined)) search: string
  ) {
    return this.contactService.contacts({
      skip,
      take,
      where: this.buildWhere({ search }),
      orderBy: { created: Prisma.SortOrder.desc },
    });
  }

  private buildWhere(where?: WhereContactArgs): Prisma.ContactWhereInput {
    const filter: Prisma.ContactWhereInput = {};
    if (where && Object.entries(where).length) {
      for (const [key, value] of Object.entries(where)) {
        if (value) {
          switch (key) {
            case 'search':
              filter.name = { contains: value };
              break;
            case 'created':
              filter.created = {
                lte: new Date(value[1]),
                gte: new Date(value[0]),
              };
              break;
            default:
              break;
          }
        }
      }
    }
    return filter;
  }
}
