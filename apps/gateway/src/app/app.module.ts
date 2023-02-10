import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { AppConfigModule } from '@travel/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../authentication/auth.module';
import { CategoryModule } from '../category/category.module';
import { RoleModule } from '../authorizations/role.module';
import { PrismaService } from './prisma.service';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    AppConfigModule,
    BlogModule,
    AuthModule,
    RoleModule,
    ContactModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
