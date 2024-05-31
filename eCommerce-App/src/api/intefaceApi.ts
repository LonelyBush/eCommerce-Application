import { CustomerSignInResult } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { ProductProjection } from '@commercetools/platform-sdk';

export interface ApiResponse {
  customerSignInResult?: CustomerSignInResult;
  productProjection?: ProductProjection;

  productProjectionArr?: ProductProjection[];
  error?: Error;
}
