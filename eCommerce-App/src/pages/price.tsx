import React, { useEffect } from 'react';
import PriceInput from '../components/price-input/price-input';
import getAllProducts from '../api/getAllProduct';

function Pricetest() {
  useEffect(() => {
    getAllProducts().then((res) => {
      console.log('prod', res.productProjectionArr);
    });
  });

  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    console.log(
      `Минимальная цена: ${minPrice}, Максимальная цена: ${maxPrice}`,
    );
    // Здесь можно добавить логику для обработки интервала цен
  };

  return (
    <div>
      <PriceInput onPriceChange={handlePriceChange} />
    </div>
  );
}

export default Pricetest;
