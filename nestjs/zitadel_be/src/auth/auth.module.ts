import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { IntrospectionStrategy } from './strategies/introspection.strategy';

@Module({
  imports: [PassportModule, HttpModule],
  providers: [JwtStrategy, IntrospectionStrategy],
  exports: [JwtStrategy, IntrospectionStrategy],
})
export class AuthModule {}
