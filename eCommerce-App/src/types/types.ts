export type ButtonType = {
  btnType: 'button' | 'submit';
  children: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type LoginFormType = {
  email: string;
  password: string;
};
