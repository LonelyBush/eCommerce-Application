import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import {
  projectKey,
  authMiddlewareOptions,
  httpMiddlewareOptions,
} from './constForApi';

const middleware = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiRoot = createApiBuilderFromCtpClient(middleware).withProjectKey({
  projectKey,
});

const cartDraft = {
  currency: 'USD',
};

export default function createCart() {
  return new Promise((resolve, reject) => {
    apiRoot
      .carts()
      .post({ body: cartDraft })
      .execute()
      .then((response) => {
        if (response.body) {
          console.log('Cart1 created:', response.body);

          resolve(response.body);
        } else {
          reject(new Error('No response body'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
