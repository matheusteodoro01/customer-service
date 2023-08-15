import { JwksClient } from 'jwks-rsa';
import { SsoNotAvailableError } from '@/domain/errors';
import axios from 'axios';

let jwksClient: JwksClient;

export const getPublicKey = async () => {
  const keycloakCertUrl =
    process.env.KEYCLOAK_BASE_URL + '/protocol/openid-connect/certs';
  jwksClient =
    jwksClient ??
    new JwksClient({
      jwksUri: keycloakCertUrl,
      cache: true,
      timeout: 10000,
      cacheMaxAge: 3600000,
      fetcher: async () => (await axios.get(keycloakCertUrl)).data,
    });
  try {
    const signingKey = await jwksClient.getSigningKey();
    const publicKey = signingKey.getPublicKey();
    return publicKey;
  } catch (error) {
    throw new SsoNotAvailableError('SSO indisponível');
  }
};
