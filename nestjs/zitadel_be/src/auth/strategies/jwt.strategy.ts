import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { zitadelConfig } from 'src/config/zitadel.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,

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
    return {
      userId: payload.sub, // Subject - user ID
      email: payload.email,
      username: payload.preferred_username,
      roles: payload['urn:zitadel:iam:org:project:roles'] || {},
    };
  }
}
