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
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from '../guards/auth.guard';
import { OurServiceModule } from '../services/ourService.module';

@Module({
  imports: [
    BlogModule,
    AuthModule,
    RoleModule,
    ContactModule,
    CategoryModule,
    AppConfigModule,
    OurServiceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule {}
