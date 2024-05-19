import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  CustomerDraft,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
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

export default function createClients(customerDraft: CustomerDraft) {
  apiRoot
    .customers()
    .post({ body: customerDraft })
    .execute()
    .then((response) => {
      console.log(
        'Customer created successfully:',
        response.body,
        response.body.customer.firstName,
      );
    })
    .catch((error) => {
      console.error('Error creating customer:', error);
    });
}
