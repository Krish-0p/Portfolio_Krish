import React from 'react';

interface ContainerProps {
  className?: string;
  fluid?: boolean;
  children: React.ReactNode;
}

export default function Container({ className = '', fluid = false, children }: ContainerProps) {
  return (
    <div
      className={`
        w-full mx-auto 
        ${fluid ? 'px-6 md:px-12 lg:px-20' : 'max-w-7xl px-6 md:px-12'} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
