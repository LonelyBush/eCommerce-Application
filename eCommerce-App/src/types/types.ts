export type ButtonType = {
  btnType: 'button' | 'submit';
  children: string;
  to?: string;
  disabled?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export type LoginFormType = {
  email: string;
  password: string;
};
