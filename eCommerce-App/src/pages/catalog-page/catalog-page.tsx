import HeaderMainPage from '../../components/header-main-page/header-main-page';
import ProductCard from '../../components/ui/product-card/product-card';
import { IProductCard } from '../../components/ui/product-card/product-card-interface';

function CatalogPage() {
  const productCard: IProductCard = {
    id: 'gghgh',
    imageUrl: '',
    name: 'Product',
    description: '',
    price: 9,
    discount: 10,
  };

  return (
    <>
      <HeaderMainPage />
      <ProductCard productCard={productCard} />
    </>
  );
}

export default CatalogPage;
