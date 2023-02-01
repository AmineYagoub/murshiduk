import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { AppConfigModule } from '@travel/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../authentication/auth.module';
import { CategoryModule } from '../category/category.module';
import { RoleModule } from '../authorizations/role.module';

@Module({
  imports: [
    AppConfigModule,
    BlogModule,
    AuthModule,
    CategoryModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
