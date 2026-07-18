import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '../ui/Container';
import Card from '../ui/Card';

interface Project {
  id: number;
  title: string;
  description: string;
  meta: string;
  link?: string;
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

export default function WorkPanel() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <section
      ref={ref}
      id="work"
      className="w-full py-20 md:py-28"
      style={{ background: 'var(--color-root)' }}
    >
      <Container fluid>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-16"
        >
          <span className="font-mono text-mono-label tracking-widest uppercase text-white/50">
            Selected Work
          </span>
          <span className="font-mono text-mono-xs tracking-widest text-white/25 uppercase">
            {String(projects.length).padStart(2, '0')} Projects
          </span>
        </motion.div>

        {/* Project Cards */}
        <div className="flex flex-col gap-20">
          {projects.map((project, i) => (
            <React.Fragment key={project.id}>
              <Card
                title={project.title}
                description={project.description}
                meta={project.meta}
                link={project.link}
                image={project.image}
                index={i}
              />
              {/* Separator line between cards */}
              {i < projects.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-[1px] origin-left"
                  style={{ background: 'var(--border-subtle)' }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}
