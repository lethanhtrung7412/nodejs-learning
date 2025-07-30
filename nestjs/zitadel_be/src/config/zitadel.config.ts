// src/config/zitadel.config.ts
export const zitadelConfig = {
  // URL của Zitadel instance
  issuer: 'https://yggdrasil-8hziuy.us1.zitadel.cloud',

  // Project ID (audience để validate token)
  audience: '330553143001717623',

  // Endpoint để lấy public keys cho JWT verification
  jwksUri: 'https://yggdrasil-8hziuy.us1.zitadel.cloud/oauth/v2/keys',

  // Endpoint để introspect token
  introspectionEndpoint:
    'https://yggdrasil-8hziuy.us1.zitadel.cloud/oauth/v2/introspect',

  // Client credentials (cần tạo service account trong Zitadel)
  clientId: '331124784744215838',
  clientSecret:
    'Kidt3Dv7ybtknj3OZYqFP12ZkSmRIe57HZKJl2Xu85rr56UiBMgRgtj8fjtZ2TNy',
};
