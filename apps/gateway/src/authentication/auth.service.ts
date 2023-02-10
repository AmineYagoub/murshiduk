import {
  Logger,
  HttpStatus,
  Injectable,
  HttpException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserModel } from './auth.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NonceService } from './nonce.service';
import { PasswordService } from './password.service';
import { PrismaService } from '../app/prisma.service';
import { AppConfigType, APP_CONFIG_REGISTER_KEY } from '@travel/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly nonceService: NonceService,
    private prisma: PrismaService
  ) {}

  /**
   * Create New User
   *
   * @param data: SignUpDto
   * @returns Promise<boolean>
   */
  async signUp(data: Prisma.UserCreateInput) {
    try {
      return this.prisma.user.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new UnprocessableEntityException(error);
      }
      Logger.error(error);
    }
  }

  /**
   * Log The use in
   *
   * @param data: Prisma.UserUpdateInput
   * @returns Promise<JWTToken>
   */
  async signing(data: Prisma.UserUpdateInput) {
    try {
      const { email, password } = data;
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { email: String(email) },
        include: { role: true, profile: true },
      });
      if (!user.isActive) {
        throw new UnauthorizedException('User Banned');
      }
      const passwordValid = await this.passwordService.validatePassword(
        String(password),
        user.password
      );

      if (!passwordValid) {
        throw new UnauthorizedException('Invalid Password');
      }
      return await this.generateJWTTokenFor(user);
    } catch (error) {
      Logger.error(error);
      throw new HttpException(error, error?.status || HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Decode JWT and get user from db
   *
   * @param token string
   *
   * @returns Promise<User>
   */
  async getUserFromJWTToken(token: string) {
    const id = String(this.jwtService.decode(token)['sub']);
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  /**
   * Generate Jwt token.
   *
   * @param user User
   *
   * @returns Promise<JWTToken>
   */
  private async generateJWTTokenFor(user: UserModel) {
    try {
      const nonce = await this.nonceService.encrypt();
      const payload = {
        sub: user.id,
        role: user.role.title,
        isActive: user.isActive,
        emailConfirmed: true,
        iat: Math.floor(Date.now() / 1000),
        nonce,
      };
      const accessToken = this.jwtService.sign(payload);
      const securityConfig = this.configService.get<AppConfigType>(
        APP_CONFIG_REGISTER_KEY
      );
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: securityConfig.jwt.refreshIn,
      });
      return {
        accessToken,
        refreshToken,
        tokenType: 'bearer',
        nonce,
      };
    } catch (error) {
      Logger.error(error);
    }
  }
}