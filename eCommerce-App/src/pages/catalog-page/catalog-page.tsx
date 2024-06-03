import { useState, useEffect } from 'react';
import HeaderMainPage from '../../components/header-main-page/header-main-page';
import ProductCard from '../../components/ui/product-card/product-card';
import {
  IProductCard,
  IPrice,
} from '../../components/ui/product-card/product-card-interface';
import getAllProducts from '../../api/getAllProduct';
import Loading from '../../components/ui/loading/loading';
import styles from './catalog-page.module.css';

function CatalogPage() {
  const [productCards, setProductCards] = useState<IProductCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        const products = response.productProjectionArr;
        const mappedProductCards = products!.map((product) => {
          const { images } = product.masterVariant;
          const imageUrlArray = images
            ? images.map((img: { url: string }) => img.url)
            : [];
          const [imageUrl] =
            imageUrlArray.length > 0 ? [imageUrlArray[0]] : [''];

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

          return {
            id: product.id,
            imageUrl,
            imageUrlArray,
            name,
            key,
            description,
            price,
            discount,
          };
        });

        setProductCards(mappedProductCards);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <HeaderMainPage />
      <div className={styles.catalogBlock}>
      {productCards.slice(0, 18).map((productCard) => (
          <ProductCard key={productCard.id} productCard={productCard} />
        ))}
      </div>
    </>
  );
}

export default CatalogPage;
