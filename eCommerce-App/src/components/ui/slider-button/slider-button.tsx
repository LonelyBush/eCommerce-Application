import styles from './slider-button.module.css';

type SliderButtonProps = {
  classNames: string;
};

function SliderButton({ classNames }: SliderButtonProps) {
  const btnClassName = `${styles.sliderBtn} ${styles[classNames]} ${classNames}`;
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  return <button className={btnClassName} type="button" />;
}

export default SliderButton;
