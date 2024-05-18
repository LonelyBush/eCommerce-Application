import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

import {
  projectKey,
  httpMiddlewareOptions,
  host,
  clientId,
  clientSecret,
  scopes,
  authTokenCache,
} from './constForApi';

export default function authWithPassword(customerSignin: CustomerSignin) {
  const options: PasswordAuthMiddlewareOptions = {
    host,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username: customerSignin.email,
        password: customerSignin.password,
      },
    },
    scopes,
    fetch,
    tokenCache: authTokenCache,
  };

  const withPasswordFlowClient = new ClientBuilder()
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(options)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(
    withPasswordFlowClient,
  ).withProjectKey({
    projectKey,
  });

  apiRoot
    .get()
    .execute()
    .then((response) => {
      console.log('Customer profile:', response.body);
    })
    .catch((error) => {
      console.error('Error retrieving customer profile:', error);
    });
}
