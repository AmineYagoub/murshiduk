import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { appConfig, AppConfigType } from '@travel/config';

import { PrismaService } from '../app/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { NonceService } from './nonce.service';
import { PasswordService } from './password.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (securityConfig: AppConfigType) => {
        return {
          secret: securityConfig.jwt.key,
          signOptions: {
            expiresIn: securityConfig.jwt.expiresIn,
          },
        };
      },
      inject: [appConfig.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PasswordService,
    NonceService,
    PrismaService,
  ],
})
export class AuthModule {}
