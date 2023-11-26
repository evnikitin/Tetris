import React from 'react';
import { Link } from 'react-router-dom';

interface CustomLinksProps {
  to: string,
  children : React.ReactNode,
}

export function CustomLink({ children, to }:CustomLinksProps) {
  return (
    <Link
      to={to}
    >
      {children}
    </Link>
  );
}
