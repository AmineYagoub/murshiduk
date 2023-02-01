import { AuthService } from './auth.service';
import { SignUpDto } from '../dto/auth/signup';
import { PasswordService } from './password.service';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { SignInDto } from '../dto/auth/signin';
import { NonceInterceptor } from '../interceptors/nonce.interceptor';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly pwdService: PasswordService
  ) {}

  @Post('signup')
  async signup(@Body() data: SignUpDto) {
    const { email, password, role } = data;
    return this.authService.signUp({
      email,
      password: await this.pwdService.hashPassword(password),
      role: {
        connectOrCreate: {
          create: {
            title: role,
          },
          where: {
            title: role,
          },
        },
      },
    });
  }

  @Post('signing')
  @UseInterceptors(NonceInterceptor)
  async signIn(@Body() data: SignInDto) {
    return this.authService.signing(data);
  }
}
