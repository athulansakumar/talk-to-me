import * as properties from  '../../app.properties';

export const environment = {
  production: true,
  baseUrl: properties.production.webBaseUrl,
  publicKey: properties.vapid.public
};
