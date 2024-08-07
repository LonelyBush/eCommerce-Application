import {
  Cart,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import {
  projectKey,
  authMiddlewareOptions,
  httpMiddlewareOptions,
} from './constForApi';
import { ApiResponse } from './intefaceApi';

const middleware = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiRoot = createApiBuilderFromCtpClient(middleware).withProjectKey({
  projectKey,
});

export default function getAllProductFromCart(
  cartId: string,
): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    apiRoot
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute()
      .then((response) => {
        if (response.body) {
          const cartDraft: Cart = {
            ...response.body,
          };
          resolve({ cartDraft });
        } else {
          reject(new Error('No response body'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
