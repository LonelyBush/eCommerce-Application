import { useState, useEffect } from 'react';
import styles from './product-info.module.css';
import getProductById from '../../api/getProductById';
import { getIdFromLocalStorage } from '../../utils/local-storage/save-id';
import {
  IProductCard,
  IPrice,
} from '../ui/product-card/product-card-interface';
import Loading from '../ui/loading/loading';

function ProductInfo() {
  const id: string | null = getIdFromLocalStorage();
  const [productCard, setProductCard] = useState<IProductCard>({
    id: '',
    imageUrl: '',
    name: '',
    key: '',
    description: '',
    price: 0,
    discount: 0,
  });

  useEffect(() => {
    if (!id) return;
    getProductById(id)
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
          if (product.masterVariant.prices) {
            const usPrice = product.masterVariant.prices.find(
              (priceArr: IPrice) => priceArr.country === 'US',
            );
            if (usPrice) {
              price = usPrice.value.centAmount / 100;
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
          }));
        }
      })
      .catch((error) => {
        console.error('Error product', error);
      });
  }, [id]);

  const { imageUrl, name } = productCard;

  if (!imageUrl || !name) {
    return <Loading />;
  }

  return (
    <div className={styles.productPage}>
      <img
        src={productCard.imageUrl}
        alt={productCard.name}
        className={styles.productImage}
      />
      <div className={styles.productAllDescription}>
        <h1>{productCard.name}</h1>
        <p>{productCard.description}</p>
        <div className={styles.productPrice}>
          <span>Price:</span> ${productCard.price}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
