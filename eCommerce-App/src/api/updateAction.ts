import {
  createApiBuilderFromCtpClient,
  Customer,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import {
  projectKey,
  authMiddlewareOptions,
  httpMiddlewareOptions,
} from './constForApi';
import { ApiResponse, UpdateActionBody } from './intefaceApi';
import { saveToLocalStorage } from '../utils/local-storage/ls-handler';

const middleware = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiRoot = createApiBuilderFromCtpClient(middleware).withProjectKey({
  projectKey,
});

export default function updateAction(
  personalId: string,
  updateBody: UpdateActionBody,
): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    apiRoot
      .customers()
      .withId({ ID: personalId })
      .post({
        body: updateBody,
      })
      .execute()
      .then((response) => {
        if (response.body) {
          const customer: Customer = {
            ...response.body,
          };
          saveToLocalStorage('version', `${customer.version}`);
          resolve({ customer });
        } else {
          reject(new Error('Update was failed !'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
