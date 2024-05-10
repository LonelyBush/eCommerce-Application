export type ButtonType = {
  btnType: 'button' | 'submit';
  children: string;
  onClick?: () => void;
};
