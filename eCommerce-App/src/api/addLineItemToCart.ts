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

export default function addLineItemToCart(
  cartId: string,
  productId: string,
  variantId: number,
  quantity: number,
) {
  const versionCart = Number(localStorage.getItem('version-cart'));

  return new Promise((resolve, reject) => {
    apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: versionCart,
          actions: [
            {
              action: 'addLineItem',
              productId,
              variantId,
              quantity,
            },
          ],
        },
      })
      .execute()
      .then((response) => {
        if (response.body) {
          console.log('Add new Item to Cart:', response.body);
          const newVersionCart = response.body.version.toString();
          localStorage.setItem('version-cart', newVersionCart);
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
