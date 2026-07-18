import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full border-t py-6"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--color-root)' }}
    >
      <Container fluid className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-mono text-mono-xs tracking-widest uppercase text-white/25"
        >
          © 2026
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="font-mono text-mono-xs tracking-widest uppercase text-white/25 flex items-center gap-2"
        >
          <span className="inline-block w-1 h-1 rounded-full bg-accent/40" />
          I Love Cats
        </motion.span>
      </Container>
    </motion.footer>
  );
}
