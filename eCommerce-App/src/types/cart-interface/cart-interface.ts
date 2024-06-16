import {
  LineItem as CommercetoolsLineItem,
  // CustomLineItem as CommercetoolsCustomLineItem,
  // MethodTaxedPrice as CommercetoolsMethodTaxedPrice,
  TypedMoney,
  LocalizedString,
  TaxedItemPrice,
} from '@commercetools/platform-sdk';

export interface ICart {
  type: string;
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy?: {
    isPlatformClient: boolean;
  };
  createdBy?: {
    isPlatformClient: boolean;
  };
  lineItems: CommercetoolsLineItem[];
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  shipping: Shipping[];
  customLineItems: CustomLineItem[];
  discountCodes: DiscountCode[];
  directDiscounts: DirectDiscount[];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  refusedGifts: RefusedGift[];
  origin: string;
  itemShippingAddresses: ItemShippingAddress[];
}

export interface LineItem {
  id: string;
  key?: string;
  productId: string;
  productKey?: string;
  name: LocalizedString;
  productSlug?: LocalizedString;
  productType: ProductTypeReference;
  variant: ProductVariant;
  price: Price;
  quantity: number;
  totalPrice: CentPrecisionMoney;
  discountedPricePerQuantity?: DiscountedLineItemPriceForQuantity[];
  taxedPrice?: TaxedItemPrice;
  taxedPricePortions?: MethodTaxedPrice[];
  state: ItemState[];
  taxRate?: TaxRate;
  perMethodTaxRate?: MethodTaxRate[];
  supplyChannel?: ChannelReference;
  distributionChannel?: ChannelReference;
  priceMode: LineItemPriceMode;
  lineItemMode: LineItemMode;
  inventoryMode?: InventoryMode;
  shippingDetails?: ItemShippingDetails;
  addedAt: string;
  custom?: CustomFields;
  lastModifiedAt: string;
}

interface ProductTypeReference {
  typeId: string;
  id: string;
}

interface ProductVariant {
  id: number;
  sku: string;
}

interface Price {
  value: TypedMoney;
}

interface CentPrecisionMoney {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

interface DiscountedLineItemPriceForQuantity {
  quantity: number;
  discountedPrice: CentPrecisionMoney;
}

interface MethodTaxedPrice {
  shippingMethod: string;
  price: CentPrecisionMoney;
}

interface ItemState {
  state: Reference;
  quantity: number;
}

interface Reference {
  typeId: string;
  id: string;
}

interface TaxRate {
  name: string;
  amount: number;
  includedInPrice: boolean;
  country: string;
}

interface MethodTaxRate {
  shippingMethod: string;
  rate: TaxRate;
}

interface ChannelReference {
  typeId: string;
  id: string;
}

interface LineItemPriceMode {}

interface LineItemMode {}

interface InventoryMode {}

interface ItemShippingDetails {}

interface CustomFields {
  type: Reference;
  fields: {
    [key: string]: string;
  };
}

interface Shipping {}

interface CustomLineItem {
  id: string;
  key?: string;
  name: LocalizedString;
  money: TypedMoney;
  taxedPrice?: TaxedItemPrice;
  taxedPricePortions?: MethodTaxedPrice[];
  totalPrice: CentPrecisionMoney;
  slug: string;
  quantity: number;
  state: ItemState[];
  taxCategory?: TaxCategoryReference;
  taxRate?: TaxRate;
  perMethodTaxRate?: MethodTaxRate[];
  discountedPricePerQuantity?: DiscountedLineItemPriceForQuantity[];
  shippingDetails?: ItemShippingDetails;
  priceMode: CustomLineItemPriceMode;
  custom?: CustomFields;
}

interface TaxCategoryReference {
  typeId: string;
  id: string;
}

interface CustomLineItemPriceMode {}

interface DiscountCode {}

interface DirectDiscount {}

interface RefusedGift {}

interface ItemShippingAddress {}
