import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const photoCount = 8;

export default function PhotoMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        height: 'var(--marquee-h)',
        minHeight: 500,
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-root)',
      }}
    >
      {/* ── Section heading in bordered box ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            width: 'clamp(300px, 50%, 700px)',
            height: '100%',
            borderLeft: '1px solid var(--border-subtle)',
            borderRight: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Corner brackets */}
          {[
            { top: 40, left: 40, bt: true, bl: true },
            { top: 40, right: 40, bt: true, br: true },
            { bottom: 40, left: 40, bb: true, bl: true },
            { bottom: 40, right: 40, bb: true, br: true },
          ].map((pos, i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: 10,
                height: 10,
                ...(pos.top !== undefined ? { top: pos.top } : {}),
                ...(pos.bottom !== undefined ? { bottom: pos.bottom } : {}),
                ...(pos.left !== undefined ? { left: pos.left } : {}),
                ...(pos.right !== undefined ? { right: pos.right } : {}),
                borderTop: pos.bt ? '1.5px solid var(--border-medium)' : 'none',
                borderBottom: pos.bb ? '1.5px solid var(--border-medium)' : 'none',
                borderLeft: pos.bl ? '1.5px solid var(--border-medium)' : 'none',
                borderRight: pos.br ? '1.5px solid var(--border-medium)' : 'none',
              }}
            />
          ))}

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-4xl)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}
          >
            Life Out of Office
          </h2>
        </motion.div>
      </div>

      {/* ── Marquee track ── */}
      <div
        style={{
          position: 'absolute',
          top: 160,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 50,
              ease: 'linear',
            },
          }}
          whileHover={{ animationPlayState: 'paused' }}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            height: '100%',
            width: 'max-content',
          }}
        >
          {/* Two sets for seamless loop */}
          {[0, 1].map((set) =>
            Array.from({ length: photoCount }).map((_, i) => (
              <div key={`${set}-${i}`} style={{ display: 'contents' }}>
                {/* Photo placeholder */}
                <div
                  style={{
                    width: 'clamp(280px, 30vw, 420px)',
                    height: '100%',
                    flexShrink: 0,
                    background: `linear-gradient(
                      ${135 + i * 20}deg,
                      rgba(134,249,79,${0.01 + i * 0.005}) 0%,
                      var(--bg-raised) 100%
                    )`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        letterSpacing: '0.15em',
                        color: 'var(--text-muted)',
                        opacity: 0.5,
                      }}
                    >
                      IMG_{String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Crosshair separator */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'relative',
                    width: 0,
                    height: '100%',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: -4,
                      left: -4,
                      width: 8,
                      height: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        width: 1,
                        height: '100%',
                        background: 'var(--text-primary)',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: 1,
                        background: 'var(--text-primary)',
                      }}
                    />
                  </span>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
