import React, { useRef, useEffect, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────
   ParticlePortrait — Interactive dot-scatter canvas
   
   Draws a portrait (or silhouette) as tiny dots on the canvas.
   Cursor proximity pushes dots away with a repulsion force;
   a spring constant pulls them back to their resting position.
   
   To use with a real photo:
     1. Place your photo at /public/images/krish.jpg
     2. Set USE_PHOTO = true below
   ───────────────────────────────────────────────────────────── */

const USE_PHOTO = true; // flip to true once you have /images/krish.jpg

// ── Tunable physics params ──
const DOT_SIZE = 1.6;    // particle radius in px
const DOT_ALPHA = 0.32;  // resting opacity (lowered by 3%)
const REPEL_RADIUS = 48;  // cursor influence radius (reduced by another 20%)
const REPEL_FORCE = 6.4;  // scatter strength (reduced by 20%)
const SPRING = 0.045;    // snap-back strength (lower = floatier)
const FRICTION = 0.88;   // velocity damping per frame
const DOT_COLOR = '232, 168, 56'; // accent gold, matches site theme

interface Particle {
  ox: number; oy: number; // origin (resting position)
  x: number;  y: number;  // current position
  vx: number; vy: number; // velocity
  color: string;          // rgb values, e.g. "232, 168, 56"
  brightness: number;     // 0 to 1 relative luminance
  opacity: number;        // fade-in opacity during loading animation
  delay: number;          // spawn delay in ms
  started: boolean;       // whether the spawn animation has started for this particle
}

export default function ParticlePortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const dprRef = useRef(1);
  const startTimeRef = useRef<number>(0);

  // ── Build particles from a silhouette ──
  const buildFromSilhouette = useCallback((cw: number, ch: number, skipAnimation = false) => {
    const isMobile = cw < 768;
    // Dynamically scale silhouette to fill the hero height
    let sh = isMobile ? Math.min(ch * 0.45, 280) : Math.min(ch * 0.85, 750);
    let sw = sh * 0.76;
    if (isMobile) {
      if (sw > cw * 0.85) {
        sw = cw * 0.85;
        sh = sw / 0.76;
      }
    } else {
      if (sw > cw * 0.85) {
        sw = cw * 0.85;
        sh = sw / 0.76;
      }
    }

    const targetWidth = Math.round(sw);
    const targetHeight = Math.round(sh);
    const off = document.createElement('canvas');
    off.width = targetWidth;
    off.height = targetHeight;
    const oc = off.getContext('2d')!;

    // Clear
    oc.fillStyle = '#000';
    oc.fillRect(0, 0, targetWidth, targetHeight);

    // Draw K shape
    oc.fillStyle = '#fff';
    oc.font = `bold ${Math.round(targetHeight * 0.9)}px "Space Grotesk", sans-serif`;
    oc.textAlign = 'center';
    oc.textBaseline = 'middle';
    oc.fillText('K', targetWidth / 2, targetHeight / 2 + 10);

    return samplePixels(off, oc, targetWidth, targetHeight, cw, ch, skipAnimation);
  }, []);

  // ── Build particles from a photo ──
  const buildFromPhoto = useCallback((cw: number, ch: number, skipAnimation = false): Promise<Particle[]> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/images/krish.jpg';

      img.onload = () => {
        const imgAspect = img.naturalWidth / img.naturalHeight || 0.76;
        const isMobile = cw < 768;
        
        // Dynamically scale photo to fill the hero height
        let sh = isMobile ? Math.min(ch * 0.45, 280) : Math.min(ch * 0.85, 750);
        let sw = sh * imgAspect;
        if (isMobile) {
          if (sw > cw * 0.85) {
            sw = cw * 0.85;
            sh = sw / imgAspect;
          }
        } else {
          if (sw > cw * 0.85) {
            sw = cw * 0.85;
            sh = sw / imgAspect;
          }
        }

        const targetWidth = Math.round(sw);
        const targetHeight = Math.round(sh);

        const off = document.createElement('canvas');
        off.width = targetWidth;
        off.height = targetHeight;
        const oc = off.getContext('2d')!;
        oc.drawImage(img, 0, 0, targetWidth, targetHeight);
        resolve(samplePixels(off, oc, targetWidth, targetHeight, cw, ch, skipAnimation));
      };

      img.onerror = () => {
        // Fallback to silhouette if photo fails to load
        resolve(buildFromSilhouette(cw, ch, skipAnimation));
      };
    });
  }, [buildFromSilhouette]);

  // ── Shared pixel sampler ──
  const samplePixels = (
    _canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    sw: number, sh: number,
    cw: number, ch: number,
    skipAnimation = false
  ): Particle[] => {
    const pxd = ctx.getImageData(0, 0, sw, sh).data;
    const particles: Particle[] = [];

    // Center the portrait on canvas (both mobile and desktop)
    const isMobile = cw < 768;
    const offsetX = (cw - sw) / 2;
    const offsetY = isMobile ? Math.max(200, (ch - sh) * 0.36) : (ch - sh) / 2;

    // Parse the DOT_COLOR theme color for photo blending
    const themeColor = DOT_COLOR.split(',').map(v => parseInt(v.trim(), 10));
    const YELLOW = themeColor.length === 3 ? themeColor : [232, 168, 56];
    const TINT = 0.55; // 0 = full photo color, 1 = pure theme yellow

    // Calculate dynamic spacing so density and performance are consistent across screen sizes.
    // Further increased target density by lowering target area size factor.
    const spacing = Math.max(2, Math.round(Math.sqrt((sw * sh) / 22000)));

    for (let y = 0; y < sh; y += spacing) {
      for (let x = 0; x < sw; x += spacing) {
        const i = (y * sw + x) * 4;
        const r = pxd[i];
        const g = pxd[i + 1];
        const b = pxd[i + 2];
        const alpha = pxd[i + 3];
        const brightness = (r + g + b) / 3;

        // For photo: sample dark pixels (non-background)
        // Adjust cutoff (e.g. 240) to include skin highlights but ignore white background
        const isVisible = USE_PHOTO
          ? alpha > 120 && brightness < 240
          : brightness > 128;

        if (isVisible) {
          const px = x + offsetX;
          const py = y + offsetY;

          let color = DOT_COLOR;
          let lum = 1.0;

          if (USE_PHOTO) {
            // Blend pixel color toward your theme yellow/gold
            const fr = Math.round(r + (YELLOW[0] - r) * TINT);
            const fg = Math.round(g + (YELLOW[1] - g) * TINT);
            const fb = Math.round(b + (YELLOW[2] - b) * TINT);

            color = `${fr}, ${fg}, ${fb}`;
            // Relative luminance (0 = black, 1 = white)
            lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          }

          particles.push({
            ox: px, oy: py,
            x: px, y: py,
            vx: 0, vy: 0,
            color,
            brightness: lum,
            opacity: skipAnimation ? 1 : 0,
            delay: 0,
            started: skipAnimation,
          });
        }
      }
    }

    // Post-process to assign delays and initial offset positions for loading animation
    if (!skipAnimation && particles.length > 0) {
      let minY = Infinity;
      let maxY = -Infinity;
      for (let j = 0; j < particles.length; j++) {
        const p = particles[j];
        if (p.oy < minY) minY = p.oy;
        if (p.oy > maxY) maxY = p.oy;
      }
      const yRange = maxY - minY || 1;

      for (let j = 0; j < particles.length; j++) {
        const p = particles[j];
        // Calculate normalized Y from bottom to top (bottom-up sweep animation)
        const normalizedY = (maxY - p.oy) / yRange;

        // Spread the delay over 1.0s, with minor random jitter for a organic transition
        p.delay = normalizedY * 850 + Math.random() * 200;

        // Offset position: start 30px below and slightly scattered horizontally
        p.x = p.ox + (Math.random() - 0.5) * 12;
        p.y = p.oy + 30 + Math.random() * 15;
      }
    }

    return particles;
  };

  // ── Animation loop ──
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = dprRef.current;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const isMobile = cw < 768;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const particles = particlesRef.current;
    const elapsed = performance.now() - startTimeRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Handle loading animation trigger
      if (!p.started) {
        if (elapsed >= p.delay) {
          p.started = true;
        } else {
          continue; // Skip rendering/updating physics until started
        }
      }

      // Smoothly fade in active particles
      if (p.opacity < 1) {
        p.opacity = Math.min(1, p.opacity + 0.05);
      }

      // Spring: pull toward origin
      p.vx += (p.ox - p.x) * SPRING;
      p.vy += (p.oy - p.y) * SPRING;

      // Repulsion from cursor (skip on mobile to prevent performance lag)
      if (!isMobile) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      // Friction
      p.vx *= FRICTION;
      p.vy *= FRICTION;

      // Integrate
      p.x += p.vx;
      p.y += p.vy;

      // Draw
      // Use pixel luminance to set resting opacity: bright areas are solid, dark areas are faint.
      // Opacity has been lowered by 3% to make the dots softer.
      const baseAlpha = USE_PHOTO 
        ? (0.09 + p.brightness * 0.75)
        : DOT_ALPHA;

      // Dots closer to their origin are dimmer (resting opacity), displaced ones glow brighter
      const displacement = Math.sqrt((p.x - p.ox) ** 2 + (p.y - p.oy) ** 2);
      const glowAlpha = Math.min(baseAlpha + displacement * 0.008, 0.95);
      
      const alphaMultiplier = isMobile ? 0.65 : 1.0;
      const finalAlpha = glowAlpha * p.opacity * alphaMultiplier;

      ctx.beginPath();
      ctx.arc(p.x, p.y, DOT_SIZE, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${finalAlpha.toFixed(2)})`;
      ctx.fill();
    }

    ctx.restore();
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // ── Setup & teardown ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();

    const cw = parent.getBoundingClientRect().width;
    const ch = parent.getBoundingClientRect().height;

    const init = async () => {
      if (USE_PHOTO) {
        particlesRef.current = await buildFromPhoto(cw, ch);
      } else {
        particlesRef.current = buildFromSilhouette(cw, ch);
      }
      startTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(animate);
    };

    init();

    // Listen on window so events aren't blocked by content layers above the canvas
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only respond when cursor is within the hero section bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y };
      } else {
        mouseRef.current = { x: -9999, y: -9999 };
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const handleResize = () => {
      resize();
      const newCw = parent.getBoundingClientRect().width;
      const newCh = parent.getBoundingClientRect().height;
      if (USE_PHOTO) {
        buildFromPhoto(newCw, newCh, true).then(p => { particlesRef.current = p; });
      } else {
        particlesRef.current = buildFromSilhouette(newCw, newCh, true);
      }
    };

    const isMobileView = window.innerWidth < 768;
    if (!isMobileView) {
      window.addEventListener('mousemove', handleMouse);
      window.addEventListener('touchmove', handleTouch, { passive: true });
      window.addEventListener('touchend', handleTouchEnd);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, buildFromPhoto, buildFromSilhouette]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
      style={{ touchAction: 'none' }}
    />
  );
}

