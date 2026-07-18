import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';

interface Project {
  id: number;
  title: string;
  description: string;
  meta: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'LogGuard',
    description: 'Intelligent Telemetry & Anomaly Detection. Secure your infrastructure with our hybrid AI engine combining LSTM neural networks and Isolation Forests.',
    meta: 'AiOps / 2024',
    image: '/projects/logguard.png',
  },
  {
    id: 2,
    title: 'BaitBuster',
    description: 'AI Phishing Detector. Stop Social Engineering & Scams in real-time. Protect yourself with standard-setting AI designed to expose OTP demands and bank impersonations.',
    meta: 'Security / 2024',
    image: '/projects/baitbuster.png',
  },
  {
    id: 3,
    title: 'Travelwise',
    description: 'Start Your Dream Vacation Today. A comprehensive travel booking platform to discover the world\'s most amazing destinations and hotels.',
    meta: 'Platform / 2023',
    image: '/projects/travelwise.png',
  },
];

/* ── Infinite scroll constants (desktop only) ── */
const SETS = 50;
const repeatedProjects = Array.from({ length: SETS }, () => projects).flat();
const MIDDLE_SET = Math.floor(SETS / 2);

/* ── Mobile Card Component ── */
function MobileProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.06]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-raised flex items-center justify-center">
            <span className="font-mono text-xs tracking-widest text-white/20 uppercase">
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 mt-1">
        <span className="font-mono text-[10px] tracking-widest text-accent">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">
          {project.meta}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-display text-xs leading-relaxed text-white/50">
        {project.description}
      </p>
    </motion.div>
  );
}

/* ── Desktop Infinite Scroll Panel ── */
function DesktopWorkPanel({ isInView }: { isInView: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount, jump to the middle of the repeated list
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      const firstItem = el.querySelector<HTMLElement>('[data-project-idx]');
      if (!firstItem) return;
      const itemH = firstItem.offsetHeight;
      const gap = 24;
      const middleOffset = MIDDLE_SET * projects.length * (itemH + gap);
      el.scrollTop = middleOffset;
    });
  }, []);

  // Infinite scroll loop — silently jump back toward the middle when near edges
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const firstItem = el.querySelector<HTMLElement>('[data-project-idx]');
    if (!firstItem) return;
    const itemH = firstItem.offsetHeight;
    const gap = 24;
    const fullItem = itemH + gap;
    const oneSetHeight = projects.length * fullItem;

    const jumpSets = 10;
    const jumpPx = jumpSets * oneSetHeight;
    const lowerBound = jumpSets * oneSetHeight;
    const upperBound = el.scrollHeight - jumpSets * oneSetHeight;

    if (el.scrollTop < lowerBound) {
      el.scrollTop += jumpPx;
    } else if (el.scrollTop > upperBound) {
      el.scrollTop -= jumpPx;
    }

    // Update active project indicator
    const viewportCenter = el.scrollTop + el.clientHeight / 2;
    const centerIdx = Math.round(viewportCenter / fullItem);
    const localIdx = ((centerIdx % projects.length) + projects.length) % projects.length;

    if (localIdx !== activeIndex && isUserScrolling.current) {
      setActiveIndex(localIdx);
    }
  }, [activeIndex]);

  // Track user-initiated scrolling
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    isUserScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 200);
  }, []);

  // Click navigation
  const scrollToProject = useCallback((index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    setActiveIndex(index);
    isUserScrolling.current = false;

    const firstItem = el.querySelector<HTMLElement>('[data-project-idx]');
    if (!firstItem) return;
    const itemH = firstItem.offsetHeight;
    const gap = 24;
    const fullItem = itemH + gap;

    const viewportCenter = el.scrollTop + el.clientHeight / 2;
    const currentGlobalIdx = Math.round(viewportCenter / fullItem);
    const currentLocalIdx = ((currentGlobalIdx % projects.length) + projects.length) % projects.length;

    let delta = index - currentLocalIdx;
    if (delta < 0) delta += projects.length;
    if (delta === 0) return;

    const targetGlobalIdx = currentGlobalIdx + delta;
    const targetScroll = targetGlobalIdx * fullItem - (el.clientHeight - itemH) / 2;

    el.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full grid grid-cols-12 gap-20 items-start">
      {/* Left Column */}
      <div className="col-span-5 flex flex-col gap-12">
        {projects.map((project, i) => {
          const isActive = activeIndex === i;
          return (
            <div
              key={project.id}
              onClick={() => scrollToProject(i)}
              className={`cursor-pointer group flex flex-col gap-4 py-8 border-b border-white/5 transition-all duration-500 last:border-0 ${
                isActive ? 'border-b-accent/20' : 'hover:border-b-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-mono text-mono-xs tracking-widest transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white/30'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`font-mono text-mono-label tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white/40'}`}>
                  {project.meta}
                </span>
              </div>

              <h3 className={`font-display text-2xl font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                {project.title}
              </h3>

              <p className={`font-display text-sm leading-relaxed transition-colors duration-500 ${isActive ? 'text-white/70' : 'text-white/30 group-hover:text-white/45'}`}>
                {project.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Right Column — Infinite Scroll */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        className="col-span-7 sticky top-28 w-full rounded-card bg-raised border border-white/[0.06] relative"
        style={{
          height: '550px',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {/* Top/bottom gradient fades */}
        <div className="sticky top-0 left-0 right-0 h-16 bg-gradient-to-b from-raised to-transparent pointer-events-none z-10" />

        <div className="flex flex-col gap-6 px-8 hide-scrollbar">
          {repeatedProjects.map((project, idx) => {
            const localIdx = idx % projects.length;
            const isActive = activeIndex === localIdx;

            return (
              <div
                key={`card-${idx}`}
                data-project-idx={localIdx}
                className="relative w-full flex-shrink-0 rounded-card overflow-hidden border transition-all duration-500"
                style={{
                  height: '340px',
                  borderColor: isActive ? 'rgba(232, 168, 56, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  boxShadow: isActive ? '0 10px 30px -10px rgba(232, 168, 56, 0.15)' : 'none',
                }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover select-none transition-all duration-700 ease-out"
                    style={{
                      filter: isActive
                        ? 'grayscale(0%) sepia(0%) brightness(1.05) contrast(1)'
                        : 'grayscale(90%) sepia(35%) brightness(0.5) contrast(1.1) hue-rotate(15deg)',
                    }}
                    draggable={false}
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-raised">
                    <span className="font-mono text-mono-xs tracking-widest text-white/20 uppercase">{project.title}</span>
                  </div>
                )}

                <div className={`absolute inset-0 bg-accent/5 pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`} />
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-raised to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}

/* ── Main Export ── */
export default function WorkPanel() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="w-full py-12 md:py-20 lg:py-28"
      style={{ background: 'var(--color-root)' }}
    >
      <Container fluid>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-10 md:mb-16 border-b border-white/5 pb-4 md:pb-6"
        >
          <span className="font-mono text-[10px] md:text-mono-label tracking-widest uppercase text-white/50">
            Selected Work
          </span>
          <span className="font-mono text-[10px] md:text-mono-xs tracking-widest text-white/25 uppercase">
            {String(projects.length).padStart(2, '0')} Projects
          </span>
        </motion.div>

        {/* Conditional Layout */}
        {isDesktop ? (
          <DesktopWorkPanel isInView={isInView} />
        ) : (
          /* Mobile: Simple stacked cards, no infinite scroll */
          <div className="flex flex-col gap-10">
            {projects.map((project, i) => (
              <MobileProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
