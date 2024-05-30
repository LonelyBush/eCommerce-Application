export interface IProductCard {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  discount: number;
}

export interface IProductCardProps {
  productCard: IProductCard;
}
