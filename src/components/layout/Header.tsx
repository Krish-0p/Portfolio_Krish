import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Container from '../ui/Container';
import DecryptedText from '../ui/DecryptedText';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Resume', href: 'https://drive.google.com/file/d/1YW9V1QZuXdwxE70l0rScLCBKdv4_snhz/view?usp=sharing' },
  { label: 'Connect', href: '#contact' },
];

function NavLink({ label, href, delay }: { label: string; href: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const isExternal = href.startsWith('http');

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="font-mono text-mono-xs tracking-widest uppercase text-white/60 no-underline hover:text-white transition-colors duration-300 px-2 py-3 md:px-3 md:py-2 inline-block"
      >
        <DecryptedText
          text={label}
          animateOn="hover"
          useOriginalCharsOnly
          speed={40}
          maxIterations={10}
        />
      </a>
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-1.5 md:bottom-0 left-2 right-2 md:left-3 md:right-3 h-[1px] bg-accent origin-left"
      />
    </motion.div>
  );
}

export default function Header() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="sticky top-0 left-0 right-0 z-50 w-full border-b"
      style={{
        height: 'var(--header-h)',
        background: 'rgba(8, 8, 12, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <Container fluid className="h-full flex items-center gap-3 sm:gap-6">
        {/* Logo monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <a href="/" aria-label="Home" className="flex items-center no-underline">
            <span
              className="font-display text-lg font-semibold text-accent"
              style={{ letterSpacing: '-0.02em' }}
            >
              K
            </span>
          </a>
        </motion.div>

        {/* Scroll progress line */}
        <div className="hidden sm:block flex-1 h-[1px] relative overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
          <motion.div
            style={{ width: progressWidth }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-accent-soft rounded-full"
          />
          {mounted && (
            <motion.div
              style={{ left: progressWidth }}
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent -translate-x-1/2 shadow-glow-sm"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-0.5 sm:gap-1 ml-auto sm:ml-0">
          {navItems.map((item, i) => (
            <NavLink key={item.href} label={item.label} href={item.href} delay={0.4 + i * 0.08} />
          ))}
        </nav>
      </Container>

      {/* Mobile: same scroll progress, relocated to the header edge where it has room */}
      <div className="sm:hidden absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <motion.div
          style={{ width: progressWidth }}
          className="h-full bg-gradient-to-r from-accent to-accent-soft"
        />
      </div>
    </motion.header>
  );
}
