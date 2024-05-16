import {
  CustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { apiRoot } from './api-client';

// const customerCredentials: CustomerSignin = {
//     email: 'test27@example.com',
//     password: 'examplePassword',
//   };

interface ApiResponse {
  customerSignInResult?: CustomerSignInResult;
  error?: Error;
}

export default function checkAuthClient(
  customerSignin: CustomerSignin,
): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    apiRoot
      .login()
      .post({ body: customerSignin })
      .execute()
      .then((response) => {
        if (response.body.customer) {
          console.log(
            'Customer signed in successfully:',
            response.body.customer,
          );
          const customerSignInResult: CustomerSignInResult = {
            customer: response.body.customer,
          };
          resolve({ customerSignInResult });
        } else {
          reject(new Error('Sign-in failed'));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
