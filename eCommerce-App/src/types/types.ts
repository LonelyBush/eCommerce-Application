export type ButtonType = {
  btnType: 'button' | 'submit';
  children: string;
  onClick?: () => void;
};

export type LoginFormType = {
  email: string;
  password: string;
};
