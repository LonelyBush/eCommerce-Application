import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { ApiResponse } from './intefaceApi';
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

export default function getProductById(): Promise<ApiResponse> {
  const productId = '1f262fbd-e389-4116-a0a7-aa78190a88b6';
  return new Promise((resolve, reject) => {
    apiRoot
      .productProjections()
      .withId({ ID: productId })
      .get()
      .execute()
      .then((response) => {
        if (response.body) {
          resolve({ productProjection: response.body });
        } else {
          reject(new Error('Response body is empty'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
