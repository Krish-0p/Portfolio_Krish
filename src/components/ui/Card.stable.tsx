import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  meta: string;
  link?: string;
  image?: string;
  index: number;
}

export default function Card({ title, description, meta, link, image, index }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      {/* Image Area */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-card bg-raised border border-white/[0.06] mb-5">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
            loading="lazy"
          />
        ) : (
          <>
            {/* Gradient placeholder */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out"
              style={{
                background: `linear-gradient(${135 + index * 25}deg, rgba(232,168,56,${0.03 + index * 0.01}) 0%, var(--color-raised) 60%, rgba(139,156,247,${0.02 + index * 0.005}) 100%)`,
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-mono text-mono-xs tracking-widest text-white/20 uppercase">
                {title}
              </span>
            </div>
          </>
        )}

        {/* Hover border glow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-card border border-accent/20 pointer-events-none"
        />
      </div>

      {/* Metadata Row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex flex-col gap-1.5 max-w-xl">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-mono-label tracking-widest text-white/90 uppercase no-underline hover:text-accent transition-colors duration-300"
            >
              {title}
            </a>
          ) : (
            <span className="font-mono text-mono-label tracking-widest text-white/90 uppercase">
              {title}
            </span>
          )}
          <p className="font-display text-sm text-white/40 leading-relaxed">
            {description}
          </p>
        </div>
        <span className="font-mono text-mono-xs tracking-widest text-white/30 uppercase whitespace-nowrap pt-0.5">
          {meta}
        </span>
      </div>
    </motion.div>
  );
}
