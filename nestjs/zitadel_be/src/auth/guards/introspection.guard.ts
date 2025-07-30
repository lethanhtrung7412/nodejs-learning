// src/auth/introspection-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class IntrospectionAuthGuard extends AuthGuard('introspection') {}
