import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';

const badges = [
  { label: 'Mumbai', accent: false },
  { label: 'Open to Work', accent: true },
  { label: '2026', accent: false },
];

export default function InfoBar() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      className="w-full border-t border-b"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--color-root)' }}
    >
      <Container fluid className="flex items-center justify-center gap-4 flex-wrap py-5">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.95 }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`
              px-4 py-1.5 rounded-full font-mono text-mono-xs tracking-widest uppercase
              border transition-colors duration-300
              ${badge.accent
                ? 'border-accent/30 text-accent bg-accent/[0.06] hover:border-accent/50 hover:bg-accent/[0.10]'
                : 'border-white/[0.08] text-white/50 bg-white/[0.02] hover:border-white/[0.14] hover:text-white/70'
              }
            `}
          >
            {badge.accent && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 animate-pulse" />
            )}
            {badge.label}
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
