import { Module } from '@nestjs/common';
import { ZitadelAuthService } from './zitadel-auth.service';

@Module({
  providers: [ZitadelAuthService],
  exports: [ZitadelAuthService],
})
export class ZitadelAuthModule {}
