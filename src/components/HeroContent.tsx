import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Staggered word reveal ── */
function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <span style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', marginRight: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Glow text with multi-layer text-shadow ── */
function GlowText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <span style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.3em',
            textShadow:
              '0 0 6px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.08)',
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroContent() {
  const { scrollYProgress } = useScroll();
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const subY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: 'var(--hero-h)',
        minHeight: 600,
        overflow: 'hidden',
        background: 'var(--bg-root)',
      }}
    >
      {/* ── Grain texture background ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.35,
          mixBlendMode: 'screen',
          background: `
            radial-gradient(ellipse 60% 50% at 35% 45%, rgba(134, 249, 79, 0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 65% 55%, rgba(194, 234, 99, 0.04) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Noise grain overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Bottom fade ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 260,
          background: 'var(--gradient-fade-bottom)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Headline row (parallax) ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: 'calc(var(--header-h) + var(--s-64))',
          left: 'var(--gutter)',
          right: 'var(--gutter)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--s-24)',
          zIndex: 3,
          y: textY,
          opacity,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-6xl)',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <WordReveal text="Hey There" delay={0.4} />
        </h1>

        {/* ── Animated divider line ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: 1,
            minWidth: 'var(--s-32)',
            height: 1,
            background: 'var(--border-medium)',
            transformOrigin: 'left center',
          }}
        />

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-6xl)',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <GlowText text="I'm a Product Builder" delay={0.7} />
        </h1>
      </motion.div>

      {/* ── Sub-text (left, mid-height) ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: 'calc(var(--header-h) + 220px)',
          left: 'var(--gutter)',
          maxWidth: 420,
          zIndex: 3,
          y: subY,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            letterSpacing: '0.02em',
          }}
        >
          I blend strategy, tech, and just the right amount of
          <br />
          chaos to craft products people actually want to use.
        </motion.p>
      </motion.div>

      {/* ── Secondary text (right, lower) ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 280,
          right: 'var(--gutter)',
          maxWidth: 460,
          textAlign: 'right',
          zIndex: 3,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            letterSpacing: '0.02em',
          }}
        >
          Pixels guide attention. Depth drives understanding.
          <br />
          I design both the surface and the structure, ensuring
          <br />
          strategy and clarity are baked into every decision.
        </motion.p>
      </motion.div>
    </section>
  );
}
