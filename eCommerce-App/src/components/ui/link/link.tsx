import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './link.module.css';

interface LinkTemplateProps {
  to: string;
  children: React.ReactNode;
}

function LinkTemplate({ to, children }: LinkTemplateProps) {
  return (
    <RouterLink to={to} className={styles.link}>
      {children}
    </RouterLink>
  );
}

export default LinkTemplate;
