import {
  CustomerSignInResult,
  Customer,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { ProductProjection, Category, Cart } from '@commercetools/platform-sdk';

export interface ApiResponse {
  customerSignInResult?: CustomerSignInResult;
  customer?: Customer;
  productProjection?: ProductProjection;
  productProjectionArr?: ProductProjection[];
  category?: Category[];
  cart?: Cart;
  error?: Error;
}

export interface UpdateActionBody {
  version: number;
  addressId?: string;
  actions: CustomerUpdateAction[];
}
