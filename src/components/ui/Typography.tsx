import React from 'react';

interface TypographyProps {
  variant?: 'display' | 'heading' | 'subhead' | 'mono' | 'mono-xs' | 'body' | 'body-dim';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  children: React.ReactNode;
}

const variantMap: Record<string, string> = {
  display: 'font-display text-display',
  heading: 'font-display text-heading',
  subhead: 'font-display text-subhead text-white/60',
  mono: 'font-mono text-mono-label uppercase tracking-widest',
  'mono-xs': 'font-mono text-mono-xs uppercase tracking-widest',
  body: 'font-display text-sm md:text-base text-white/50 leading-relaxed',
  'body-dim': 'font-display text-sm text-white/30 leading-relaxed',
};

const defaultTag: Record<string, string> = {
  display: 'h1',
  heading: 'h2',
  subhead: 'p',
  mono: 'span',
  'mono-xs': 'span',
  body: 'p',
  'body-dim': 'p',
};

export default function Typography({
  variant = 'body',
  as,
  className = '',
  children,
}: TypographyProps) {
  const Component = (as || defaultTag[variant] || 'p') as React.ElementType;

  return (
    <Component className={`${variantMap[variant] || ''} ${className}`}>
      {children}
    </Component>
  );
}
