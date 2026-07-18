import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Container from '../ui/Container';
import SplitText from '../ui/SplitText';
import ParticlePortrait from '../ui/ParticlePortrait';

const cycleTexts = ["I'm Krish", "I'm Full Stack Developer", "I'm Project Builder"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cycleTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-root py-20 md:py-32 flex items-center" style={{ minHeight: 'var(--hero-min-h)' }}>
      {/* Ambient gradient background matching our color tokens */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-[0.22] mix-blend-screen pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(232, 168, 56, 0.04) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(139, 156, 247, 0.03) 0%, transparent 55%)
          `,
        }}
      />

      {/* Subtle background grid pattern */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Interactive Particle Portrait Background */}
      <ParticlePortrait />

      <Container fluid className="relative z-30 w-full">
        {/* Main Content Animation Wrapper */}
        <motion.div style={{ y: textY, opacity }} className="flex flex-col justify-between w-full gap-16 md:gap-24">

          {/* Top Row: Hey There ───────────── Cycling Text */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full -translate-y-[10px]">
            <h1 className="font-display text-4xl md:text-6xl font-light text-white whitespace-nowrap tracking-tight">
              Hey There
            </h1>

            {/* Horizontal connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block flex-1 h-[1px] bg-white/[0.14] mx-8 origin-left"
            />

            {/* Cycling Text with glow effect (left-aligned with fixed desktop width to prevent transition shifting) */}
            <div className="h-[90px] flex items-center justify-start w-full md:w-[620px] shrink-0">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-3xl sm:text-4xl md:text-6xl font-light text-white text-left whitespace-nowrap tracking-tight"
                >
                  <SplitText
                    text={cycleTexts[index]}
                    delay={35}
                    duration={0.5}
                    ease="power3.out"
                    scrollTriggerEnabled={false}
                    className="inline-block"
                    textAlign="left"
                    tag="span"
                    nowrap={true}
                  />
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Row: Description columns matching the positioning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-48 md:mt-0">
            {/* Left description (aligned under "Hey There") */}
            <div className="max-w-[340px]">
              <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-3"></p>
              <p className="font-display text-sm md:text-base text-white/50 leading-relaxed">
                I blend clean code, robust systems, and high performance to craft web products people actually want to use.
              </p>
            </div>

            {/* Right description (aligned under the cycling text, pushed lower on desktop) */}
            <div className="max-w-md md:ml-auto md:text-right mt-4 md:mt-20">
              <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-3"></p>
              <p className="font-display text-sm md:text-base text-white/50 leading-relaxed">
                Code defines the architecture. Interaction drives engagement. I build both the surface and the logic, ensuring quality and scale are integrated into every decision.
              </p>
            </div>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
