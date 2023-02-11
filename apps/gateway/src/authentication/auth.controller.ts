import {
  Get,
  Body,
  Post,
  Request,
  UseGuards,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dto/auth/signin';
import { JWTAuthGuard } from '../guards/auth.guard';
import { isPublic } from '../decorators/isPublic.decorator';
import { NonceInterceptor } from '../interceptors/nonce.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup() {
    return this.authService.signUp();
  }

  @isPublic()
  @Post('signing')
  @UseInterceptors(NonceInterceptor)
  async signIn(@Body() data: SignInDto) {
    return this.authService.signing(data);
  }

  @UseGuards(JWTAuthGuard)
  @Get('user')
  getAuthUser(@Request() req) {
    return req.user;
  }
}
