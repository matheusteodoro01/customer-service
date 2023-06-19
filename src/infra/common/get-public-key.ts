import { JwksClient } from 'jwks-rsa';
import { SsoNotAvailableError } from '@/domain/errors';
import axios from 'axios';

let jwksClient: JwksClient;

export const getPublicKey = async () => {
  jwksClient =
    jwksClient ??
    new JwksClient({
      jwksUri: process.env.KEYCLOAK_CERT_URL as string,
      cache: true,
      timeout: 10000,
      cacheMaxAge: 3600000,
      fetcher: async () =>
        (
          await axios.get<{ keys: any }>(
            process.env.KEYCLOAK_CERT_URL as string,
          )
        ).data,
    });
  try {
    const signingKey = await jwksClient.getSigningKey();
    const publicKey = signingKey.getPublicKey();
    return publicKey;
  } catch (error) {
    throw new SsoNotAvailableError('SSO indisponível');
  }
};
