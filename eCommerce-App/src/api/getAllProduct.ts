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

export default function getAllProducts(query?: object): Promise<ApiResponse> {
  //   const priceFilter = `variants.price.centAmount:range (4000 to 6000)`;
  return new Promise((resolve, reject) => {
    apiRoot
      .productProjections()
      .search()
      //   .get({
      //     queryArgs: { [`text.en-US`]: 'Beer', filter: [priceFilter] },
      //   })
      .get(query)
      .execute()
      .then((response) => {
        console.log('res', response);
        if (response.body) {
          resolve({ productProjectionArr: response.body.results });
        } else {
          reject(new Error('Response body is empty or not an array'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
