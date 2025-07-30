import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { zitadelConfig } from 'src/config/zitadel.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,

      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: zitadelConfig.jwksUri,
      }),

      issuer: zitadelConfig.issuer,

      audience: zitadelConfig.audience,
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload received:', payload); // Debug log

    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return {
      userId: payload.sub, // Subject - user ID
      email: payload.email,
      username: payload.preferred_username,
      roles: payload['urn:zitadel:iam:org:project:roles'] || {},
    };
  }
}
