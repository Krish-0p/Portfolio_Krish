import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

function BracketLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        fontWeight: 400,
        letterSpacing: '0.1em',
        color: 'var(--text-primary)',
        textDecoration: 'none',
        padding: '8px 14px',
        display: 'inline-block',
        textTransform: 'uppercase' as const,
      }}
    >
      {/* Corner brackets */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => {
        const isTop = pos.includes('t');
        const isLeft = pos.includes('l');
        return (
          <motion.span
            key={pos}
            animate={{
              borderColor: hovered
                ? 'rgba(134, 249, 79, 0.7)'
                : 'var(--border-strong)',
              boxShadow: hovered
                ? '0 0 8px rgba(134, 249, 79, 0.3)'
                : '0 0 0px transparent',
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 7,
              height: 7,
              ...(isTop ? { top: 0 } : { bottom: 0 }),
              ...(isLeft ? { left: 0 } : { right: 0 }),
              borderTop: isTop ? '1px solid var(--border-strong)' : 'none',
              borderBottom: !isTop ? '1px solid var(--border-strong)' : 'none',
              borderLeft: isLeft ? '1px solid var(--border-strong)' : 'none',
              borderRight: !isLeft ? '1px solid var(--border-strong)' : 'none',
            }}
          />
        );
      })}
      {label}
    </motion.a>
  );
}

export default function AnimatedHeader() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        width: '100%',
        height: 'var(--header-h)',
        background: 'rgba(6, 6, 10, 0.65)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0 var(--gutter)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--s-20)',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Logo zone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          style={{ flexShrink: 0 }}
        >
          <a href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 'var(--r-8)',
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              K
            </div>
          </a>
        </motion.div>

        {/* Progress bar */}
        <div
          style={{
            flex: 1,
            height: 1,
            position: 'relative',
            background: 'var(--border-subtle)',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: progressWidth,
              background: 'var(--gradient-accent)',
              borderRadius: 1,
              boxShadow: '0 0 12px var(--accent-glow)',
            }}
          />
          {/* Scroll indicator dot */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: progressWidth,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent)',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 8px var(--accent-glow)',
              opacity: mounted ? 1 : 0,
            }}
          />
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-8)' }}>
          {navItems.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
            >
              <BracketLink label={item.label} href={item.href} />
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
