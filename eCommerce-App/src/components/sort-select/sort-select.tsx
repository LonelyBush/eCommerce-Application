import styles from './sort-select.module.css';

interface SortSelectProps {
  onSortChange: (selectedSort: string) => void;
}

function SortSelect({ onSortChange }: SortSelectProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    onSortChange(selectedSort);
  };

  return (
    <div className={styles.sortSelectBlock}>
      <select className={styles.sortSelect} onChange={handleSelectChange}>
        <option className={styles.sortOption} value="">
          Sort by...
        </option>
        <option className={styles.sortOption} value="price desc">
          Price ↓
        </option>
        <option className={styles.sortOption} value="price asc">
          Price ↑
        </option>
        <option className={styles.sortOption} value="name.en-US asc">
          Name A-Z
        </option>
        <option className={styles.sortOption} value="name.en-US desc">
          Name Z-A
        </option>
      </select>
    </div>
  );
}

export default SortSelect;
