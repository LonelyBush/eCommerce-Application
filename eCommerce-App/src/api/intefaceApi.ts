import {
  CustomerSignInResult,
  Customer,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

export default interface ApiResponse {
  customerSignInResult?: CustomerSignInResult;
  customer?: Customer;
  error?: Error;
}

export interface UpdateActionBody {
  version: number;
  actions: CustomerUpdateAction[];
}
