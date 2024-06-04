import React, { useState, memo, useCallback } from 'react';
import styles from './price-input.module.css';

interface PriceInputProps {
  onPriceChange: (minPrice: number, maxPrice: number) => void;
}

function PriceInput({ onPriceChange }: PriceInputProps) {
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  const handleMinPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value === '' ? '' : Number(e.target.value);
      setMinPrice(value);
    },
    [],
  );

  const handleMaxPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value === '' ? '' : Number(e.target.value);
      setMaxPrice(value);
    },
    [],
  );

  const handleBlur = useCallback(() => {
    console.log(
      `handleBlur called with minPrice: ${minPrice}, maxPrice: ${maxPrice}`,
    );
    if (minPrice !== '' && maxPrice !== '' && minPrice > maxPrice) {
      setError('The minimum price cannot be greater than the maximum');
    } else {
      setError(null);
      if (minPrice !== '' && maxPrice !== '') {
        onPriceChange(Number(minPrice), Number(maxPrice));
      }
    }
  }, [minPrice, maxPrice, onPriceChange]);

  return (
    <div className={styles.wrapperInputPrice}>
      <div>
        <input
          className={styles.priceInput}
          type="number"
          min="1"
          value={minPrice}
          placeholder="min price"
          onChange={handleMinPriceChange}
          onBlur={handleBlur}
        />
      </div>
      <span> - </span>
      <div>
        <input
          className={styles.priceInput}
          type="number"
          min="1"
          value={maxPrice}
          placeholder="max price"
          onChange={handleMaxPriceChange}
          onBlur={handleBlur}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
export default memo(PriceInput);
