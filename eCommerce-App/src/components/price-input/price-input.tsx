import React, { useState, useEffect } from 'react';
import styles from './price-input.module.css';

interface PriceInputProps {
  onPriceChange: (minPrice: number, maxPrice: number) => void;
}

function PriceInput({ onPriceChange }: PriceInputProps) {
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (minPrice !== '' && maxPrice !== '' && minPrice > maxPrice) {
      setError('The minimum price cannot be greater than the maximum');
    } else {
      setError(null);
      if (minPrice !== '' && maxPrice !== '') {
        onPriceChange(Number(minPrice), Number(maxPrice));
      }
    }
  }, [minPrice, maxPrice, onPriceChange]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0 || e.target.value === '') {
      setMinPrice(e.target.value === '' ? '' : value);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0 || e.target.value === '') {
      setMaxPrice(e.target.value === '' ? '' : value);
    }
  };

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
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default PriceInput;
