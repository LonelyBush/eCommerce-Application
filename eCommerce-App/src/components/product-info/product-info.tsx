import { useState, useEffect } from 'react';
import getProductById from '../../api/getProductById';
import { getIdFromLocalStorage } from '../../utils/local-storage/save-id';
import {
  IProductCard,
  IPrice,
} from '../ui/product-card/product-card-interface';
import Loading from '../ui/loading/loading';
import Tags from '../ui/tags/tags';
import styles from './product-info.module.css';
import getAllProducts from '../../api/getAllProduct';

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
    getAllProducts().then((res) => {
      console.log('allProducts', res);
    });
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
    <div className={styles.productPageBlock}>
      <div className={styles.productPageImgBlock}>
        <img
          src={productCard.imageUrl}
          alt={productCard.name}
          className={styles.productPageImage}
        />
      </div>
      <div className={styles.productPageInfo}>
        <Tags.H1>{productCard.name}</Tags.H1>
        <p className={styles.productPageDescription}>
          {productCard.description}
        </p>
      </div>
    </div>
  );
}

export default ProductInfo;
