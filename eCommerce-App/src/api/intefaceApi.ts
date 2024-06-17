import {
  CustomerSignInResult,
  Customer,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

import {
  ProductProjection,
  Category,
  Cart,
  CartUpdateAction,
} from '@commercetools/platform-sdk';

export interface ApiResponse {
  customerSignInResult?: CustomerSignInResult;
  customer?: Customer;
  productProjection?: ProductProjection;
  productProjectionArr?: ProductProjection[];
  cartDraft?: Cart;
  category?: Category[];
  cart?: Cart;
  error?: Error;
}

export interface UpdateActionBody {
  version: number;
  addressId?: string;
  actions: CustomerUpdateAction[];
}

export interface CartUpdateActionBody {
  version: number;
  actions: CartUpdateAction[];
}
