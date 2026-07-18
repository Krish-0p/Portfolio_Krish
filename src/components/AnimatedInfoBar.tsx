import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface InfoColumn {
  icon: string;
  label: string;
  highlight: string;
  highlightColor?: string;
}

const columns: InfoColumn[] = [
  { icon: '📍', label: 'BASED IN Mumbai,', highlight: 'INDIA' },
  { icon: '◆', label: 'PRODUCT DESIGNER,', highlight: 'OUTSKILL', highlightColor: 'var(--accent-soft)' },
  { icon: '✦', label: 'AVAILABLE FOR,', highlight: 'PROJECTS', highlightColor: 'var(--accent-soft)' },
];

function GlassInfoCard({ column, index }: { column: InfoColumn; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
        padding: 'var(--s-24) var(--s-16)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: index < columns.length - 1 ? '1px solid var(--border-faint)' : 'none',
        cursor: 'default',
      }}
    >
      {/* Subtle pattern overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none',
        }}
      />

      <span style={{ fontSize: 'var(--text-xl)', position: 'relative', zIndex: 1 }}>
        {column.icon}
      </span>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          fontWeight: 400,
          letterSpacing: '0.1em',
          lineHeight: 1.4,
          color: 'var(--text-primary)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {column.label}
        <br />
        <span style={{ color: column.highlightColor || 'var(--text-muted)' }}>
          {column.highlight}
        </span>
      </p>
    </motion.div>
  );
}

export default function AnimatedInfoBar() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        minHeight: 'var(--infobar-h)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {columns.map((col, i) => (
        <GlassInfoCard key={i} column={col} index={i} />
      ))}
    </div>
  );
}
