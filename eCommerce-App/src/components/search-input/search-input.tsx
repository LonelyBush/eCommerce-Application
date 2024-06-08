import { useCallback, useState, memo } from 'react';
import styles from './search-input.module.css';

interface SearchInputProps {
  onSearchChange: (search: string) => void;
}

function SearchInput({ onSearchChange }: SearchInputProps) {
  const [search, setSearch] = useState<string>('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch(value);
      if (value.trim() === '') {
        onSearchChange('');
      }
    },
    [onSearchChange],
  );

  const handleBlur = useCallback(() => {
    if (search.trim() !== '') {
      onSearchChange(search);
    }
  }, [search, onSearchChange]);

  return (
    <div className={styles.searchInputBlock}>
      <input
        className={styles.searchInput}
        type="text"
        value={search}
        placeholder="search"
        pattern="[a-zA-Z]*"
        onChange={handleSearchChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className={styles.searchBtn} 
            // onClick={togglePasswordVisibility}
          />
    </div>
  );
}

export default memo(SearchInput);
