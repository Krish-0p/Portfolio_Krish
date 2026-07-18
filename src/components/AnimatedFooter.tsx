import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedFooter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        width: '100%',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        padding: 'var(--s-24) var(--gutter)',
        overflow: 'hidden',
      }}
    >
      {/* Grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
            style={{
              flex: 1,
              borderRight: i < 2 ? '1px solid var(--border-faint)' : 'none',
              transformOrigin: 'center top',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
          }}
        >
          ©
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            textAlign: 'center',
          }}
        >
          Made with Figma, Code and Taste ❤️
        </motion.span>

        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
          }}
        >
          {/* Empty right slot */}
        </motion.span>
      </div>
    </motion.footer>
  );
}
