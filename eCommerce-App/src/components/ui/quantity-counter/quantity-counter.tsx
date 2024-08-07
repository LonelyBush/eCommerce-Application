import styles from './quantity-counter.module.css';

function QuantityCounter({
  onClickPlus,
  inputValue,
  onClickMinus,
}: {
  inputValue: string;
  onClickPlus: () => void;
  onClickMinus: () => void;
}) {
  return (
    <div className={styles.quantityContainer}>
      <button type="button" onClick={onClickMinus}>
        -
      </button>
      <input type="text" readOnly value={inputValue} />
      <button type="button" onClick={onClickPlus}>
        +
      </button>
    </div>
  );
}

export default QuantityCounter;
