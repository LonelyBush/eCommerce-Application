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
    <div className={styles.sortSelect}>
      <select onChange={handleSelectChange}>
        <option value="">sort by...</option>
        <option value="price desc">price ↓</option>
        <option value="price asc">price ↑</option>
        <option value="name.en-US asc">name A-Z</option>
        <option value="name.en-US desc">name Z-A</option>
      </select>
    </div>
  );
}

export default SortSelect;
