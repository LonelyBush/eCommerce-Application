import {
  type TokenCache,
  type TokenCacheOptions,
  type TokenStore,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

export const projectKey: string = process.env.PROJECT_KEY!;
export const scopes: string[] = [process.env.SCOPE!];
export const host: string = process.env.AUTH_URL!;
export const clientId: string = process.env.CLIENT_ID!;
export const clientSecret: string = process.env.SECRET!;

export const authorization: string = 'Bearer 205-MdxNkPxG-6nQwvl3vf2gWShfh1SS';

export const anonimTokenCache: TokenCache = {
  get: (tokenCacheOptions?: TokenCacheOptions) => {
    console.log(tokenCacheOptions);
    const token = localStorage.getItem('anonimToken') ?? '';
    const expirationTime =
      Number(localStorage.getItem('anonimExpirationTime')) ?? '';
    return { token, expirationTime };
  },
  set: (cache: TokenStore, tokenCacheOptions?: TokenCacheOptions) => {
    console.log(tokenCacheOptions);
    localStorage.setItem('anonimToken', cache.token);
    localStorage.setItem(
      'anonimExpirationTime',
      cache.expirationTime.toString(),
    );
  },
};

export const authTokenCache: TokenCache = {
  get: () => {
    const token = localStorage.getItem('authToken') ?? '';
    const expirationTime =
      Number(localStorage.getItem('authExpirationTime')) ?? '';
    return { token, expirationTime };
  },
  set: (cache: TokenStore) => {
    localStorage.setItem('authToken', cache.token);
    localStorage.setItem('authExpirationTime', cache.expirationTime.toString());
  },
};

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
  tokenCache: anonimTokenCache,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.API_URL!,
  fetch,
};
