import { LineItem } from '@commercetools/platform-sdk';

export interface ITags {
  children: React.ReactNode;
}

export interface CartContent {
  totalLineItemQuantity: number;
  totalPrice: number;
  lineItems: LineItem[];
  version: number;
}
