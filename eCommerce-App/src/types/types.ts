export type ButtonType = {
  btnType: 'button' | 'submit';
  children: string;
  onClick?: () => void;
};

export type LoginFormType = {
  mail: string;
  password: string;
};
