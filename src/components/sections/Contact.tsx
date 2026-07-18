import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';
import Button from '../ui/Button';
import DecryptedText from '../ui/DecryptedText';

const links = [
  { label: 'krishshejwal0p@gmail.com', href: 'mailto:krishshejwal0p@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/Krish-0p' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/krish-shejwal/' },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-root)' }}
    >
      {/* Subtle background grid */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-[1px]"
            style={{
              left: `${25 * (i + 1)}%`,
              background: 'var(--border-subtle)',
            }}
          />
        ))}
      </div>

      <Container fluid className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          {/* Left: Headline */}
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display text-heading text-white leading-tight">
                Let's build something
                <br />
                <span className="text-white/50">worth shipping.</span>
              </h2>
            </motion.div>
          </div>

          {/* Right: CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <Button variant="primary" href="https://x.com/Krish_0p_" target="_blank" rel="noopener noreferrer">
              <DecryptedText
                text="Say Hello"
                animateOn="hover"
                useOriginalCharsOnly
                speed={40}
                maxIterations={10}
              />
            </Button>
          </motion.div>
        </div>

        {/* Links row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="flex items-center gap-5 mt-12 flex-wrap"
        >
          {links.map((link, i) => (
            <React.Fragment key={link.label}>
              {i > 0 && <span className="text-white/15 text-xs">·</span>}
              <a
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="font-mono text-mono-xs tracking-widest uppercase text-white/40 no-underline hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
