import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { ZitadelAuthModule } from '@auth/zitadel-auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // explicitly specify the path
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST') as string,
          port: parseInt(configService.get<string>('DB_PORT') || '5432'),
          username: configService.get<string>('DB_USER') as string,
          password: configService.get<string>('DB_PASSWORD') as string,
          database: configService.get<string>('DB_NAME') as string,
          entities: [User],
          synchronize: true,
        };
      },
    }),
    ZitadelAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          authority: configService.getOrThrow('ZITADEL_AUTHORITY'),
          authorization: {
            type: 'jwt-profile',
            profile: {
              type: 'application',
              keyId: configService.getOrThrow('ZITADEL_KEY_ID'),
              key: configService.getOrThrow('ZITADEL_KEY'),
              appId: configService.getOrThrow('ZITADEL_APP_ID'),
              clientId: configService.getOrThrow('ZITADEL_CLIENT_ID'),
            },
          },
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [ConfigService, AppService],
})
export class AppModule {}
