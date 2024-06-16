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

export default function removeLineItemFromCart(
  cartId: string,
  lineItemId: string,
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
              action: 'removeLineItem',
              lineItemId,
            },
          ],
        },
      })
      .execute()
      .then((response) => {
        if (response.body) {
          console.log('Removed Item from Cart:', response.body);
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
