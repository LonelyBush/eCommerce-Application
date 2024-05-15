import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { apiRoot } from './api-client';

// const customerCredentials: CustomerSignin = {
//     email: 'test27@example.com',
//     password: 'examplePassword',
//   };

export default function checkAuthClient(Customer: CustomerSignin) {
  return apiRoot
    .login()
    .post({ body: Customer })
    .execute()
    .then((response) => {
      if (response.body.customer) {
        console.log('Customer signed in successfully:', response.body.customer);
      } else {
        console.log('Sign-in failed');
      }
    })
    .catch((error) => {
      console.error('Error signing in:', error);
    });
}
//       // Test create new user for commercetools
// const createCustomer = () => {
//   return apiRoot
//     .customers()
//     .post({
//       // The CustomerDraft is the object within the body
//       body: {
//         email: 'test27@example.com',
//         password: 'examplePassword',
//       },
//     })
//     .execute();
// };

// // Create the customer and output the Customer ID
// createCustomer()
//   .then(({ body }) => {
//     console.log(body.customer.email);
//   })
//   .catch(console.error);
