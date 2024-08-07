import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styles from './link.module.css';

interface LinkTemplateProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

function LinkTemplateIcon({ to, children, className }: LinkTemplateProps) {
  const location = useLocation();
  const segments = location.pathname.split('/');
  const isActiveLink = `/${segments[1]}` === to;

  return (
    <RouterLink to={to} className={styles.linkBlock}>
      <div
        className={`${styles.iconHeader} ${className || ''} ${isActiveLink ? styles.activeLink : ''}`}
      />
      <span
        className={`${styles.textLink} ${isActiveLink ? styles.activeLink : ''}`}
      >
        {children}
      </span>
    </RouterLink>
  );
}

export default LinkTemplateIcon;
