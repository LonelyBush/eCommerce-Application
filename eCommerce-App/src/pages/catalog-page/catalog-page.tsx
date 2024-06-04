import { useState, useCallback } from 'react';
import HeaderMainPage from '../../components/header-main-page/header-main-page';
import styles from './catalog-page.module.css';
import PriceInput from '../../components/price-input/price-input';
import SearchInput from '../../components/search-input/search-input';
import Catalog from '../../components/catalog/catalog';

function CatalogPage() {
  const [query, setQuery] = useState<object>({});
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const handlePriceChange = useCallback(
    (newMinPrice?: number, newMaxPrice?: number, newSearch?: string) => {
      let priceFilter = '';
      if ((newMinPrice === undefined || newMinPrice === 0) && newMaxPrice) {
        priceFilter = `variants.price.centAmount:range (0 to ${newMaxPrice * 100})`;
      }
      if ((newMaxPrice === undefined || newMaxPrice === 0) && newMinPrice) {
        priceFilter = `variants.price.centAmount:range (${newMinPrice * 100} to 99999)`;
      }
      if (newMaxPrice && newMinPrice) {
        priceFilter = `variants.price.centAmount:range (${newMinPrice * 100} to ${newMaxPrice * 100})`;
      }

      const newQuery = {
        queryArgs: {
          ...(newSearch ? { [`text.en-US`]: newSearch } : {}),
          filter: priceFilter ? [priceFilter] : [],
        },
      };
      setQuery(newQuery);
    },
    [],
  );

  const handlePriceInputChange = (
    newMinPrice?: number,
    newMaxPrice?: number,
  ) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    handlePriceChange(newMinPrice, newMaxPrice, search);
  };

  const handleSearchChange = (newSearch: string) => {
    if (newSearch.trim() === '') {
      setSearch(undefined);
      handlePriceChange(minPrice, maxPrice, undefined);
    } else {
      setSearch(newSearch);
      handlePriceChange(minPrice, maxPrice, newSearch);
    }
  };


  //   .get({
  //     queryArgs: { [`text.en-US`]: 'Beer', filter: [priceFilter] },
  //   })

  return (
    <>
      <HeaderMainPage />

      <div className={styles.wrapperFilter}>
        <div>
          <PriceInput onPriceChange={handlePriceInputChange} />
        </div>
        <div>
          <SearchInput onSearchChange={handleSearchChange} />
        </div>
      </div>
      <Catalog query={query} />
    </>
  );
}

export default CatalogPage;
