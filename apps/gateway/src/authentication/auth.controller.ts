import {
  Get,
  Body,
  Put,
  Post,
  Param,
  Request,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dto/auth/signin';
import { UpdateUserAvatarDto, UpdateUserDto } from '../dto/auth/update';
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

  @Get('user')
  getAuthUser(@Request() req) {
    return req.user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.authService.updateUser(id, data);
  }

  @Put(':id/avatar')
  async updateAvatar(
    @Param('id') id: string,
    @Body() data: UpdateUserAvatarDto
  ) {
    return this.authService.updateUserAvatar(id, data?.avatar);
  }
}
