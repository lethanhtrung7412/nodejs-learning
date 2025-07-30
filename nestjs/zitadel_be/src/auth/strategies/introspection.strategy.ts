import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { ZitadelUser } from '../interface/zitadel.interface';
import { zitadelConfig } from 'src/config/zitadel.config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IntrospectionStrategy extends PassportStrategy(
  Strategy,
  'introspection',
) {
  constructor(private httpService: HttpService) {
    super();
  }

  async validate(req: any[]): Promise<any> {
    // Get token from headers

    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException('No token provide');
    }

    console.log("token", token)

    const introspectionResult = await this.introspectToken(token);

    if (!introspectionResult.active) {
      throw new UnauthorizedException('Token is not active');
    }

    return {
      userId: introspectionResult.sub,
      email: introspectionResult.email,
      username: introspectionResult.username,
      roles: introspectionResult['urn:zitadel:iam:org:project:roles'] || {},
      tokenInfo: introspectionResult, // Thông tin đầy đủ từ Zitadel
    };
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7); // Bỏ "Bearer " prefix
  }

  private async introspectToken(token: string): Promise<any> {
    // Tạo Basic Auth credentials
    const credentials = Buffer.from(
      `${zitadelConfig.clientId}:${zitadelConfig.clientSecret}`,
    ).toString('base64');

    try {
      // Gọi API introspection
      const response = await firstValueFrom(
        this.httpService.post(
          zitadelConfig.introspectionEndpoint,
          new URLSearchParams({ token }), // Body: token=<access_token>
          {
            headers: {
              Authorization: `Basic ${credentials}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      console.error('Token introspection failed:', error);
      throw new UnauthorizedException('Token introspection failed');
    }
  }
}
