export interface ZitadelJwtPayload {
  sub: string; // Zitadel user ID
  email: string;
  iss: string;
  aud: string;
  exp: number;
  iat: number;
  name?: string;
  given_name?: string;
  family_name?: string;
}
