export interface IProductCard {
  id: string;
  imageUrl: string;
  name: string;
  key: string;
  description: string;
  price: number;
  discount: number;
}

export interface IProductCardProps {
  productCard: IProductCard;
}

export interface ICategory {
  typeId: 'category';
  id: string;
}

export interface IPrice {
  id: string;
  value: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
  };
  country?: string;
}

interface IAvailability {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

export interface IImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface IDescription {
  'de-DE'?: string;
  'en-GB'?: string;
  'en-US'?: string;
}

export interface IProduct {
  id: string;
  key: string;
  version: number;
  productType: {
    id: string;
    typeId: 'product-type';
  };
  createdAt: string;
  lastModifiedAt: string;
  name: {
    'en-US': string;
    'en-GB': string;
    'de-DE': string;
  };
  description: IDescription;
  categories: ICategory[];
  categoryOrderHints: Record<string, unknown>;
  slug: {
    'en-US': string;
    'en-GB': string;
    'de-DE': string;
  };
  metaTitle?: Record<string, string>;
  metaDescription?: Record<string, string>;
  metaKeywords?: Record<string, string>;
  masterVariant: {
    id: number;
    sku: string;
    prices: IPrice[];
    images: IImage[];
    attributes: Array<Record<string, unknown>>;
    assets: Array<Record<string, unknown>>;
    availability: IAvailability;
  };
  variants: Array<Record<string, unknown>>;
  searchKeywords: Record<string, unknown>;
  hasStagedChanges: boolean;
  published: boolean;
  taxCategory: {
    typeId: 'tax-category';
    id: string;
  };
}
