import { CookieSerializeOptions, serialize } from 'cookie';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTToken } from '../authentication/auth.type';
import { AppConfigType, APP_CONFIG_REGISTER_KEY, isProd } from '@travel/config';

@Injectable()
export class NonceInterceptor implements NestInterceptor {
  /**
   *
   * @param configService
   */
  constructor(private configService: ConfigService) {}

  /**
   * Intercept response
   *
   * @param context
   * @param next
   *
   * @returns {Observable<JWTToken>}
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<JWTToken> {
    return next.handle().pipe(
      map((response) => {
        if (response) {
          const { nonce, ...jwt } = response;
          const res = context.switchToHttp().getResponse();
          res.header('Set-Cookie', this.buildCookie(nonce));
          return jwt;
        }
      })
    );
  }

  /**
   * Build Http Cookie.
   *
   * @param value
   * @returns {string}
   */
  private buildCookie(value: string): string {
    const config = this.configService.get<AppConfigType>(
      APP_CONFIG_REGISTER_KEY
    );
    const { nonceName, nonceExpiresIn } = config.jwt;
    const options: CookieSerializeOptions = {
      httpOnly: true,
      maxAge: nonceExpiresIn,
      path: '/',
      sameSite: 'lax',
      secure: isProd,
    };
    return serialize(nonceName, value, options);
  }
}
