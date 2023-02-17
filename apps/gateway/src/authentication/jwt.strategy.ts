import { parse } from 'cookie';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '../app/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfigType, APP_CONFIG_REGISTER_KEY } from '@travel/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      aud: configService.get<AppConfigType>(APP_CONFIG_REGISTER_KEY).jwt.aud,
      iss: configService.get<AppConfigType>(APP_CONFIG_REGISTER_KEY).jwt.iss,
      secretOrKey: configService.get<AppConfigType>(APP_CONFIG_REGISTER_KEY).jwt
        .key,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    { sub, nonce }: { sub: string; nonce: string }
  ) {
    const cookies = request.headers['cookie'];

    if (!cookies) {
      throw new UnauthorizedException();
    }
    const { nonceName } = this.configService.get<AppConfigType>(
      APP_CONFIG_REGISTER_KEY
    ).jwt;

    const nonces = parse(cookies);
    console.log(nonces);
    if (nonces[nonceName] !== nonce) {
      // TODO You should log the ip of requester,
      throw new UnauthorizedException();
    }
    // TODO looking up the userId in a list of revoked tokens,
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id: sub },
      include: { profile: true, role: true },
    });
    delete user.password;
    return user;
  }
}
