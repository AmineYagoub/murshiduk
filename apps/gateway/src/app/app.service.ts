import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {
    this.find().then((res) => {
      if (!res) {
        this.create({
          title: 'موقع السياحة',
          agreement: 'سياسة الإستخدام',
          privacy: 'سياسة الخصوصية',
          aboutUs: 'حول الموقع',
          description: 'وصف مختصر للموقع',
          contactEmail: 'admin@domain.com',
        });
      }
    });
  }
  /**
   * Create a App
   *
   * @param data Prisma.AppConfigCreateInput The AppConfig data.
   * @returns Promise<AppConfig>
   */
  async create(data: Prisma.AppCreateInput) {
    try {
      return this.prisma.app.create({
        data,
      });
    } catch (error) {
      Logger.error(error.message);
    }
  }

  /**
   * Update a App
   *
   * @param data: Prisma.AppUpdateInput The App data.
   * @returns Promise<App>
   */
  async update(data: Prisma.AppUpdateInput) {
    try {
      return this.prisma.app.update({
        data,
        where: { id: 1 },
      });
    } catch (error) {
      Logger.error(error.message);
    }
  }

  /**
   * Find a App by its unique key.
   *
   * @returns Promise<App | null>
   */
  async find(field?: string) {
    try {
      const params: Prisma.AppFindUniqueArgs = { where: { id: 1 } };
      if (field) {
        params.select = { [field]: true, title: true, description: true };
      }
      const data = await this.prisma.app.findUnique(params);
      const { aboutUs, agreement, privacy, id, ...rest } = data;
      return rest;
    } catch (error) {
      Logger.error(error.message);
    }
  }
}
