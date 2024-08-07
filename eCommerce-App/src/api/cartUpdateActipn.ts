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
import { ApiResponse, CartUpdateActionBody } from './intefaceApi';
import { saveToLocalStorage } from '../utils/local-storage/ls-handler';

const middleware = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiRoot = createApiBuilderFromCtpClient(middleware).withProjectKey({
  projectKey,
});

export default function cartUpdateAction(
  cartId: string,
  updateBody: CartUpdateActionBody,
): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: updateBody,
      })
      .execute()
      .then((response) => {
        if (response.body) {
          const cartDraft: Cart = {
            ...response.body,
          };
          saveToLocalStorage('version-cart', `${cartDraft.version}`);
          resolve({ cartDraft });
        } else {
          reject(new Error('Update was failed !'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
