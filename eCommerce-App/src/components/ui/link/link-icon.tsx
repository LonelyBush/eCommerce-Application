import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './link.module.css';

interface LinkTemplateProps {
  to: string;
  children: React.ReactNode;
  className: string;
}

function LinkTemplateIcon({ to, children, className }: LinkTemplateProps) {
  return (
    <RouterLink to={to} className={styles.linkBlock}>
      <div className={`${styles.iconHeader} ${className}`} />
      <span className={styles.textLink}>{children}</span>
    </RouterLink>
  );
}

export default LinkTemplateIcon;
