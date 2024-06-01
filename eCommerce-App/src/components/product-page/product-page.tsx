import React, { useState, useEffect } from 'react';
import styles from './product-page.module.css';
import HeaderMainPage from '../header-main-page/header-main-page';
import getProductById from '../../api/getProductById';

function ProductPage() {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');

  useEffect(() => {
    getProductById()
      .then((response) => {
        const product = response.productProjection;
        console.log('product', product);
        if (product) {
          const { images } = product.masterVariant;
          if (images && images.length > 0) setImageUrl(images[0].url);
          setName(product.name['en-US']);
          if (product.description) setDescription(product.description['en-US']);
          if (product.masterVariant.prices) {
            const usPrice = product.masterVariant.prices.find(
              (priceArr) => priceArr.country === 'US',
            );
            if (usPrice) {
              const priceInDollars = usPrice.value.centAmount / 100;
              setPrice(String(priceInDollars));
              const discountedCentAmount = usPrice.discounted?.value.centAmount;
              if (typeof discountedCentAmount === 'number') {
                const discountPriceInDollars = discountedCentAmount / 100;
                setDiscountPrice(String(discountPriceInDollars));
              }
            }
          }
        }
      })
      .catch((error) => {
        console.error('Error product', error);
      });
  }, []);

  if (!imageUrl || !name) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderMainPage />
      <div className={styles.productPage}>
        <img src={imageUrl} alt={name} className={styles.productImage} />
        <div className={styles.productAllDescription}>
          <h1>{name}</h1>
          <p>{description}</p>
          <div className={styles.productPrice}>
            <span>Price:</span> ${price}
            <div>
              <span>Discount price:</span> ${discountPrice}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
