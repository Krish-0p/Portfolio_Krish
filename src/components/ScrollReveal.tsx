import { useRef } from 'react';
import { motion, useInView, type Variant } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  threshold?: number;
  scale?: number;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
  threshold = 0.2,
  scale,
  className,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const directionMap: Record<string, { x?: number; y?: number }> = {
    up:    { y: distance },
    down:  { y: -distance },
    left:  { x: distance },
    right: { x: -distance },
    none:  {},
  };

  const offset = directionMap[direction] || {};

  const hidden: Variant = {
    opacity: 0,
    ...offset,
    ...(scale !== undefined ? { scale } : {}),
  };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(scale !== undefined ? { scale: 1 } : {}),
  };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
