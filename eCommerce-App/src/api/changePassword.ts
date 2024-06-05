import {
  createApiBuilderFromCtpClient,
  Customer,
  CustomerChangePassword,
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

export default function changePassword(
  updateBody: CustomerChangePassword,
): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    apiRoot
      .customers()
      .password()
      .post({ body: updateBody })
      .execute()
      .then((response) => {
        if (response.body) {
          const customer: Customer = {
            ...response.body,
          };
          localStorage.setItem('version', `${customer.version}`);
          resolve({ customer });
        } else {
          reject(new Error('Change of password was failed !'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
