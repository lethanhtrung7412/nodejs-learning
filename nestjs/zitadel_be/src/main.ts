import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const appOptions: NestApplicationOptions = {
  //   logger: ['error', 'warn', 'debug', 'log'],
  // };
  const corsOptions: CorsOptions | CorsOptionsDelegate<Express.Request> = {};
  const validationOptions: ValidationPipeOptions = {
    transform: true,
    always: true,
    forbidUnknownValues: true,
  };

  const globalApiPrefix: string = '/api';
  // const scopes: string[] = ['openid', 'profile', 'email', 'offline_access'];
  // let redirectUri: string;

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableVersioning();
  app.setGlobalPrefix(globalApiPrefix);

  const config: ConfigService = app.get(ConfigService);
  const authority: string = config.getOrThrow<string>('ZITADEL_AUTHORITY');
  const swaggerDocument = new DocumentBuilder()
    .setTitle('Zitadel NestJs Example')
    .setTermsOfService('http://swagger.io/terms/')
    .setExternalDoc('Find out more about Swagger', 'http://swagger.io/')
    .setContact('Contact the developer', '', 'mail@example.com')
    .setLicense('Apache 2.0', 'http://www.apache.org/licenses/LICENSE-2.0.html')
    // Authentication security by token introspection
    .addSecurity('zitadel-jwt', {
      type: 'openIdConnect',
      openIdConnectUrl: `${authority}/.well-known/openid-configuration`,
      name: 'Zitadel',
    })
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
