import { Module } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';

import { RoleService } from './role.service';

@Module({
  imports: [],
  providers: [RoleService, PrismaService],
  exports: [RoleService],
})
export class RoleModule {}
