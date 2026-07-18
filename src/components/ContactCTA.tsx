import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const socialLinks = [
  { label: 'X', href: '#' },
  { label: 'EMAIL', href: '#' },
  { label: 'LINKED IN', href: '#' },
  { label: 'INSTAGRAM', href: '#' },
];

/* ── Corner bracket CTA button ── */
function BracketCTA({ text, href }: { text: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '16px 40px',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-lg)',
        fontWeight: 400,
        letterSpacing: '0.12em',
        color: 'var(--text-primary)',
        textDecoration: 'underline',
        textUnderlineOffset: 6,
        textDecorationColor: 'var(--border-medium)',
        cursor: 'pointer',
      }}
    >
      {/* Four corner brackets with animated glow */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => {
        const isTop = pos.includes('t');
        const isLeft = pos.includes('l');
        return (
          <motion.span
            key={pos}
            animate={{
              width: hovered ? 12 : 8,
              height: hovered ? 12 : 8,
              borderColor: hovered
                ? 'var(--accent)'
                : 'var(--border-strong)',
              boxShadow: hovered
                ? '0 0 12px var(--accent-glow)'
                : '0 0 0 transparent',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            style={{
              position: 'absolute',
              ...(isTop ? { top: 0 } : { bottom: 0 }),
              ...(isLeft ? { left: 0 } : { right: 0 }),
              borderTop: isTop ? '1.5px solid var(--border-strong)' : 'none',
              borderBottom: !isTop ? '1.5px solid var(--border-strong)' : 'none',
              borderLeft: isLeft ? '1.5px solid var(--border-strong)' : 'none',
              borderRight: !isLeft ? '1.5px solid var(--border-strong)' : 'none',
            }}
          />
        );
      })}

      {/* Glow background on hover */}
      <motion.span
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 2,
          background: 'rgba(134, 249, 79, 0.04)',
          borderRadius: 'var(--r-2)',
          pointerEvents: 'none',
        }}
      />

      <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>
    </motion.a>
  );
}

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        width: '100%',
        minHeight: 550,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--s-80) var(--gutter)',
        borderTop: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      {/* ── Grid lines (decorative) ── */}
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
          <div
            key={i}
            style={{
              flex: 1,
              borderRight: i < 2 ? '1px solid var(--border-faint)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Horizontal grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              borderBottom: i < 2 ? '1px solid var(--border-faint)' : 'none',
            }}
          />
        ))}
      </div>

      {/* ── Social links (right) ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: 'var(--s-48)',
          right: 'var(--gutter)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--s-8)',
          zIndex: 1,
        }}
      >
        {socialLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
            transition={{
              duration: 0.4,
              delay: 0.3 + i * 0.08,
              ease: 'easeOut',
            }}
            whileHover={{ x: -4, color: 'var(--accent)' }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.1em',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-6)',
            }}
          >
            <span style={{ fontSize: 'var(--text-xs)' }}>↗</span>
            {link.label}
          </motion.a>
        ))}
      </motion.div>

      {/* ── CTA block (centered) ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--s-32)',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            letterSpacing: '0.1em',
            color: 'var(--text-secondary)',
            textAlign: 'center',
          }}
        >
          WANT TO MAKE DESIGN YOUR UNFAIR ADVANTAGE?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <BracketCTA text="SCHEDULE A CALL" href="#" />
        </motion.div>
      </div>
    </section>
  );
}
