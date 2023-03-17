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
  async dashboard() {
    try {
      const users = await this.prisma.contact.count();
      const blogs = await this.prisma.blog.count();
      const tags = await this.prisma.category.count();
      const countries = await this.prisma.contact.groupBy({
        by: ['country'],
        _count: {
          country: true,
        },
      });
      return {
        users,
        blogs,
        tags,
        comments: 0,
        countries: countries
          .slice(0, 7)
          .map((el) => ({ name: el.country, value: el._count.country })),
      };
    } catch (error) {
      Logger.error(error.message);
    }
  }

  async getDataForHomePage() {
    const blogs = await this.prisma.blog.findMany({
      take: 2,
      orderBy: { created: 'desc' },
    });
    const categories = await this.prisma.category.findMany();
    return [blogs, categories];
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
      const fields = {
        title: true,
        description: true,
        facebookUrl: true,
        twitterUrl: true,
        whatsApp: true,
        instagramUrl: true,
        youtubeUrl: true,
        messengerId: true,
        aboutUs: true,
      };
      if (field) {
        params.select = {
          [field]: true,
          ...fields,
        };
      }
      return await this.prisma.app.findUnique(params);
    } catch (error) {
      Logger.error(error.message);
    }
  }
}
