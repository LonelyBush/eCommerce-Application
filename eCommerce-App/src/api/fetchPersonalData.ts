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
import { ApiResponse } from './intefaceApi';

const middleware = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiRoot = createApiBuilderFromCtpClient(middleware).withProjectKey({
  projectKey,
});

export default function fetchPersonalData(
  personalId: string,
): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    apiRoot
      .customers()
      .withId({ ID: personalId })
      .get()
      .execute()
      .then((response) => {
        if (response.body) {
          const customer: Customer = {
            ...response.body,
          };
          resolve({ customer });
        } else {
          reject(new Error('Fetching of profile data is failed'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
