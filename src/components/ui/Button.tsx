import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'ghost' | 'link';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export default function Button({
  href,
  variant = 'primary',
  children,
  className = '',
  onClick,
  target,
  rel,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const Component = href ? 'a' : 'button';
  const elementProps = href ? { href, onClick, target, rel } : { onClick };

  if (variant === 'primary') {
    return (
      <motion.div
        className={`relative inline-block ${className}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Component
          {...elementProps}
          className="relative flex items-center gap-3 px-7 py-3.5 font-mono text-mono-label uppercase tracking-widest text-root no-underline bg-accent rounded-subtle transition-all duration-300 hover:shadow-glow-md"
        >
          {children}
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="text-root"
          >
            →
          </motion.span>
        </Component>
      </motion.div>
    );
  }

  if (variant === 'ghost') {
    return (
      <Component
        {...elementProps}
        className={`relative px-5 py-2.5 font-mono text-mono-label uppercase tracking-widest text-white/70 no-underline border border-white/10 rounded-subtle hover:border-accent/40 hover:text-accent transition-all duration-300 ${className}`}
      >
        {children}
      </Component>
    );
  }

  // Link variant — underline reveal
  return (
    <motion.div
      className={`relative inline-block group ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Component
        {...elementProps}
        className="font-mono text-mono-label uppercase tracking-widest text-white/70 no-underline hover:text-accent transition-colors duration-300"
      >
        {children}
      </Component>
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-accent origin-left"
      />
    </motion.div>
  );
}
