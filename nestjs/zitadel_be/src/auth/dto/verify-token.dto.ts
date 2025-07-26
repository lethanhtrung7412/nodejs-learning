import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class ExchangeTokenDto {
  @IsString()
  @IsNotEmpty()
  zitadelToken: string;
}
