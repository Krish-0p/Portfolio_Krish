import React from 'react';
import { motion } from 'framer-motion';
import LogoLoop from '../ui/LogoLoop';
import {
  SiReact,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiDocker,
  SiApachekafka,
  SiApacheflink,
  SiPostgresql,
  SiMysql,
  SiMongodb
} from 'react-icons/si';

const row1 = [
  'Design is not decoration. Design is structure.',
  'Ship it. Learn. Ship again.',
  'Constraints breed creativity.',
  'Pixels guide attention. Depth drives understanding.',
  'Good interfaces disappear.',
  'Measure twice. Deploy once.',
];

const techLogos = [
  { node: <SiReact className="w-8 h-8 text-white/20 hover:text-accent transition-colors duration-300" />, title: "React" },
  { node: <SiTypescript className="w-8 h-8 text-white/20 hover:text-accent transition-colors duration-300" />, title: "TypeScript" },
  { node: <SiPython className="w-8 h-8 text-white/20 hover:text-accent transition-colors duration-300" />, title: "Python" },
  { node: <SiFastapi className="w-8 h-8 text-white/20 hover:text-accent transition-colors duration-300" />, title: "FastAPI" },
  { node: <SiDocker className="w-8 h-8 text-white/20 hover:text-accent transition-colors duration-300" />, title: "Docker" },
  { node: <SiApachekafka className="w-8 h-8 text-white/20 hover:text-accent transition-colors duration-300" />, title: "Apache Kafka" },
  { node: <SiApacheflink className="w-8 h-8 text-white/20 hover:text-accent transition-colors duration-300" />, title: "Apache Flink" },
  { node: <SiPostgresql className="w-8 h-8 text-white/20 hover:text-accent transition-colors duration-300" />, title: "PostgreSQL" },
  { node: <SiMysql className="w-8 h-8 text-white/20 hover:text-accent transition-colors duration-300" />, title: "MySQL" },
  { node: <SiMongodb className="w-8 h-8 text-white/20 hover:text-accent transition-colors duration-300" />, title: "MongoDB" },
];

function TickerRow({ items, direction }: { items: string[]; direction: 'left' | 'right' }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 80,
            ease: 'linear',
          },
        }}
        className="inline-flex"
      >
        {doubled.map((text, i) => (
          <span
            key={`${direction}-${i}`}
            className="inline-flex items-center mx-8 font-mono text-mono-label tracking-widest uppercase"
            style={{ color: 'var(--text-ghost)' }}
          >
            <span className="text-accent/30 mr-6">/</span>
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function PhotoMarquee() {
  return (
    <section
      className="w-full overflow-hidden border-t border-b py-8"
      style={{
        borderColor: 'var(--border-subtle)',
        background: 'var(--color-root)',
      }}
    >
      <div className="h-full flex flex-col justify-center gap-8">
        {/* Row 1: Scrolling Text */}
        <TickerRow items={row1} direction="left" />
        
        {/* Row 2: Logo Loop */}
        <div className="w-full flex items-center h-10 select-none">
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="right"
            logoHeight={32}
            gap={64}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="var(--color-root)"
            ariaLabel="Technical Skills Logo Loop"
          />
        </div>
      </div>
    </section>
  );
}
