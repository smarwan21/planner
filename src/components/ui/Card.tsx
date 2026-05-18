import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'button' | 'label';
  onClick?: () => void;
}

export function Card({ children, className = '', as: Tag = 'div', onClick }: CardProps) {
  return (
    <Tag
      onClick={onClick}
      className={`card p-5 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
