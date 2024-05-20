export type ButtonType = {
  btnType: 'button' | 'submit';
  children: string;
  to?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export type LoginFormType = {
  email: string;
  password: string;
};
