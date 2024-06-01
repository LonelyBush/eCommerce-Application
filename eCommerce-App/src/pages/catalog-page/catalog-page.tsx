import { useState, useEffect } from 'react';
import HeaderMainPage from '../../components/header-main-page/header-main-page';
import ProductCard from '../../components/ui/product-card/product-card';
import {
  IProductCard,
  IPrice,
} from '../../components/ui/product-card/product-card-interface';
import getProductById from '../../api/getProductById';
import Loading from '../../components/ui/loading/loading';

function CatalogPage() {
  const [productCard, setProductCard] = useState<IProductCard>({
    id: '',
    imageUrl: '',
    name: '',
    key: '',
    description: '',
    price: 0,
    discount: 0,
  });

  const position = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  useEffect(() => {
    getProductById('1f262fbd-e389-4116-a0a7-aa78190a88b6')
      .then((response) => {
        const product = response.productProjection;
        console.log('product', product);
        if (product) {
          const { images } = product.masterVariant;
          let imageUrl = '';
          if (images && images.length > 0) imageUrl = images[0].url;

          const name = product.name['en-US'];
          const key = product.key || '';
          let description = '';
          if (product.description) description = product.description['en-US'];

          let price = 0;
          let discount = 0;
          if (product.masterVariant.prices) {
            const usPrice = product.masterVariant.prices.find(
              (priceArr: IPrice) => priceArr.country === 'US',
            );
            if (usPrice) {
              price = usPrice.value.centAmount / 100;
              discount = usPrice.discounted?.value.centAmount ?? 0;
              if (typeof discount === 'number') {
                discount /= 100;
              }
            }
          }

          setProductCard((prevState) => ({
            ...prevState,
            id: product.id,
            imageUrl,
            name,
            key,
            description,
            price,
            discount,
          }));
        }
      })
      .catch((error) => {
        console.error('Error product', error);
      });
  }, []);

  const { imageUrl, name } = productCard;

  if (!imageUrl || !name) {
    return <Loading />;
  }

  return (
    <>
      <HeaderMainPage />
      <div style={position}>
        <ProductCard productCard={productCard} />
      </div>
    </>
  );
}

export default CatalogPage;
