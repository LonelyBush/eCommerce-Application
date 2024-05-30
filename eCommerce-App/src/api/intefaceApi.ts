import {
  CustomerSignInResult,
  Customer,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

export default interface ApiResponse {
  customerSignInResult?: CustomerSignInResult;
  customer?: Customer;
  error?: Error;
}
