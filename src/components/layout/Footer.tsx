import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full border-t py-7 sm:py-8 mt-auto relative"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--color-root)' }}
    >
      {/* Background Watermark Logo (Large, cropped K) in a crop-bounded wrapper */}
      <div 
        className="absolute bottom-0 right-0 w-[320px] md:w-[400px] h-[320px] md:h-[400px] pointer-events-none select-none overflow-hidden z-0"
      >
        <img
          src="/logo.png"
          alt="K Watermark"
          className="w-full h-full object-contain opacity-[0.07]"
          style={{
            filter: 'invert(1)',
            mixBlendMode: 'screen',
            transform: 'translate(15%, 15%)',
          }}
        />
      </div>

      <Container fluid className="relative z-10 flex flex-row items-center justify-between gap-4 flex-wrap">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-mono-xs tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors duration-300 select-none"
        >
          © 2026 KRISH
        </motion.span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-5"
        >
          <div className="flex items-center gap-2 font-mono text-mono-xs tracking-widest uppercase text-white/30 select-none group">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/60 shadow-glow-sm transition-transform duration-300 group-hover:scale-125" />
            <span>I Love Cats</span>
          </div>
        </motion.div>
      </Container>
    </motion.footer>
  );
}
