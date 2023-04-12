import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Service, Prisma } from '@prisma/client';
import { PrismaService } from '../app/prisma.service';

@Injectable()
export class OurServicesService {
  constructor(private prisma: PrismaService) {}

  async service(
    serviceWhereUniqueInput: Prisma.ServiceWhereUniqueInput
  ): Promise<Service | null> {
    return this.prisma.service.findUnique({
      where: serviceWhereUniqueInput,
      include: {
        author: {
          select: { profile: true, role: true },
        },
      },
    });
  }

  async services(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ServiceWhereUniqueInput;
    where?: Prisma.ServiceWhereInput;
    orderBy?: Prisma.ServiceOrderByWithRelationInput;
  }): Promise<{
    total: number;
    data: Service[];
  }> {
    const { skip, take, cursor, where, orderBy } = params;
    const data = await this.prisma.$transaction([
      this.prisma.service.count({ where }),
      this.prisma.service.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          author: {
            select: { profile: true, role: true },
          },
        },
      }),
    ]);
    return {
      total: data[0],
      data: data[1],
    };
  }

  async createService(data: Prisma.ServiceCreateInput): Promise<Service> {
    try {
      return await this.prisma.service.create({
        data,
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new UnprocessableEntityException(e.message);
      }
    }
  }

  async updateService(params: {
    where: Prisma.ServiceWhereUniqueInput;
    data: Prisma.ServiceUpdateInput;
  }): Promise<Service> {
    const { where, data } = params;
    return this.prisma.service.update({
      data,
      where,
    });
  }

  async deleteService(where: Prisma.ServiceWhereUniqueInput): Promise<Service> {
    return this.prisma.service.delete({
      where,
    });
  }
}
