import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  date: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'EMILY DASHBOARD',
    description:
      'Designed a contextual, on-page AI experience that transforms complex web content into fast, actionable insights — without breaking the user\'s flow.',
    date: 'EMILY/ 25',
    link: '#',
  },
  {
    id: 2,
    title: 'MEMBERSHIPS FOR GS LMS',
    description:
      'Designed the end-to-end membership purchase and management flow — from discovery to checkout to member dashboard.',
    date: 'MEMBERSHIPS/ 24',
  },
  {
    id: 3,
    title: 'GS LEARN LMS REDESIGN',
    description:
      'Led a ground-up redesign of a learning platform — improving course navigation, progress tracking, and content consumption.',
    date: 'LMS REDESIGN/ 23',
  },
];

/* ── Sidebar project index ── */
function ProjectIndex({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-16)' }}>
      {projects.map((p, i) => {
        const isActive = i === activeIndex;
        return (
          <motion.button
            key={p.id}
            onClick={() => onSelect(i)}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--s-16)',
              textAlign: 'left',
              position: 'relative',
            }}
          >
            <motion.span
              animate={{
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                letterSpacing: '0.12em',
                minWidth: 30,
                flexShrink: 0,
              }}
            >
              [{String(i + 1).padStart(2, '0')}]
            </motion.span>
            <motion.span
              animate={{
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                letterSpacing: '0.12em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {p.title}
            </motion.span>
            {/* Active indicator dot */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="active-dot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    position: 'absolute',
                    left: -16,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    boxShadow: '0 0 8px var(--accent-glow)',
                  }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ── Project card ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-24)', width: '100%' }}
    >
      {/* Image area with hover effects */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          boxShadow: hovered
            ? '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(134, 249, 79, 0.15)'
            : '0 2px 8px rgba(0,0,0,0.2), 0 0 0 1px var(--border-subtle)',
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          width: '100%',
          height: 'clamp(300px, 45vw, 566px)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--r-4)',
          background: 'var(--bg-raised)',
          cursor: project.link ? 'pointer' : 'default',
        }}
      >
        {/* Placeholder gradient */}
        <motion.div
          animate={{
            scale: hovered ? 1.03 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            height: '100%',
            background: `
              linear-gradient(135deg,
                rgba(134,249,79,0.03) 0%,
                rgba(12,12,18,0.8) 50%,
                rgba(194,234,99,0.02) 100%
              )
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.2em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            [ project image ]
          </span>
        </motion.div>

        {/* Hover glow overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(134,249,79,0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Metadata row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%',
          gap: 'var(--s-24)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--s-12)',
            maxWidth: 580,
            minWidth: 0,
          }}
        >
          {project.link ? (
            <motion.a
              href={project.link}
              whileHover={{ color: 'var(--accent)' }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-base)',
                letterSpacing: '0.1em',
                color: 'var(--text-primary)',
                textDecoration: 'underline',
                textUnderlineOffset: 4,
              }}
            >
              {project.title}
            </motion.a>
          ) : (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-base)',
                letterSpacing: '0.1em',
                color: 'var(--text-primary)',
              }}
            >
              {project.title}
            </span>
          )}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-sm)',
              lineHeight: 1.5,
              color: 'var(--text-secondary)',
              letterSpacing: '0.01em',
            }}
          >
            {project.description}
          </p>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            letterSpacing: '0.1em',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            paddingTop: 2,
            flexShrink: 0,
          }}
        >
          {project.date}
        </span>
      </div>
    </motion.article>
  );
}

/* ── Sidebar contact links ── */
function SidebarLinks() {
  const links = [
    { label: '[EMAIL]', items: [{ text: 'HELLO@EXAMPLE.COM', href: '#' }] },
    {
      label: '[SOCIAL]',
      items: [
        { text: 'INSTAGRAM', href: '#' },
        { text: 'X', href: '#' },
        { text: 'LINKEDIN', href: '#' },
      ],
    },
    { label: '[CV]', items: [{ text: 'CLICK HERE', href: '#' }] },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {links.map((row, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-16)' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              flexShrink: 0,
              minWidth: 55,
            }}
          >
            {row.label}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-16)' }}>
            {row.items.map((item, j) => (
              <motion.a
                key={j}
                href={item.href}
                whileHover={{ color: 'var(--accent)' }}
                transition={{ duration: 0.2 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  position: 'relative',
                }}
              >
                {item.text}
              </motion.a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Work Section ── */
export default function WorkPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        width: '100%',
        height: 'var(--work-h)',
        minHeight: 700,
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      {/* ── Sidebar ── */}
      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 'var(--sidebar-w)',
          minWidth: 'var(--sidebar-w)',
          height: '100%',
          flexShrink: 0,
          position: 'relative',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface)',
        }}
      >
        {/* Top label */}
        <div style={{ padding: 'var(--s-48) var(--gutter) 0' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xl)',
              letterSpacing: '0.15em',
              color: 'var(--text-primary)',
            }}
          >
            WORK
          </span>
        </div>

        {/* Mid: project index */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: 'var(--gutter)',
            right: 'var(--s-16)',
          }}
        >
          <ProjectIndex activeIndex={activeIndex} onSelect={setActiveIndex} />
        </div>

        {/* Bottom: contact links */}
        <div style={{ marginTop: 'auto', padding: '0 var(--gutter) var(--s-48)' }}>
          <SidebarLinks />
        </div>
      </motion.aside>

      {/* ── Scrollable project panel ── */}
      <div
        style={{
          flex: 1,
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-root)',
        }}
      >
        {/* Top blur mask */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            zIndex: 2,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Scrollable content */}
        <div
          className="no-scrollbar"
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 1100,
              margin: '0 auto',
              padding: 'var(--s-48)',
              paddingBottom: 120,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--s-56)',
            }}
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom blur mask */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            zIndex: 2,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            maskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}
