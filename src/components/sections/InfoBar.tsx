import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function InfoBar() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  // Weather state
  const [weather, setWeather] = useState<{ temp: number; desc: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&current=temperature_2m,weather_code'
        );
        if (!response.ok) throw new Error();
        const data = await response.json();
        const current = data.current;
        const temp = Math.round(current.temperature_2m);
        const code = current.weather_code;

        // WMO Weather code mapping
        let desc = 'CLOUDY';
        if (code === 0) desc = 'CLEAR';
        else if (code >= 1 && code <= 3) desc = 'PARTLY CLOUDY';
        else if (code === 45 || code === 48) desc = 'FOGGY';
        else if (code >= 51 && code <= 55) desc = 'DRIZZLE';
        else if (code >= 61 && code <= 65) desc = 'RAINY';
        else if (code >= 71 && code <= 75) desc = 'SNOWY';
        else if (code >= 80 && code <= 82) desc = 'SHOWERS';
        else if (code >= 95 && code <= 99) desc = 'STORMY';

        setWeather({ temp, desc });
      } catch {
        setWeather({ temp: 28, desc: 'HUMID' }); // Sensible Mumbai default fallback
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full border-t border-b overflow-hidden"
      style={{
        borderColor: 'var(--border-subtle)',
        background: 'var(--color-root)',
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.06)]">
        {/* Column 1: Location & Live Weather */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center py-16 px-6 gap-5 hover:bg-white/[0.01] transition-colors duration-300 group cursor-default"
        >
          {/* Glowing Map Pin Icon */}
          <div className="relative w-9 h-9 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 group-hover:border-red-500/40 group-hover:bg-red-500/15 transition-all duration-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-mono-xs tracking-widest text-white/50 group-hover:text-white/80 transition-colors duration-300">
              BASED IN MUMBAI,
            </span>
            <span className="font-mono text-mono-xs tracking-widest text-red-400 font-medium">
              {loading ? 'FETCHING WEATHER...' : `${weather?.desc}, ${weather?.temp}°C`}
            </span>
          </div>
        </motion.div>

        {/* Column 2: Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center py-16 px-6 gap-5 hover:bg-white/[0.01] transition-colors duration-300 group cursor-default"
        >
          {/* Glowing 3x3 Dot Grid Icon */}
          <div className="relative w-9 h-9 flex items-center justify-center rounded-full bg-accent/10 border border-accent/20 group-hover:border-accent/40 group-hover:bg-accent/15 transition-all duration-300">
            <div className="grid grid-cols-3 gap-0.5">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-accent/80 group-hover:bg-accent transition-colors duration-300" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-mono-xs tracking-widest text-white/50 group-hover:text-white/80 transition-colors duration-300">
              PRODUCT DESIGNER,
            </span>
            <span className="font-mono text-mono-xs tracking-widest text-accent font-medium">
              Fullstack
            </span>
          </div>
        </motion.div>

        {/* Column 3: Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center py-16 px-6 gap-5 hover:bg-white/[0.01] transition-colors duration-300 group cursor-default"
        >
          {/* Glowing Rotated Square / Diamond Icon */}
          <div className="relative w-9 h-9 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 group-hover:border-secondary/40 group-hover:bg-secondary/15 transition-all duration-300">
            <div className="w-3.5 h-3.5 border-2 border-secondary/80 rotate-45 flex items-center justify-center group-hover:border-secondary transition-colors duration-300">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-mono-xs tracking-widest text-white/50 group-hover:text-white/80 transition-colors duration-300">
              AVAILABLE FOR,
            </span>
            <span className="font-mono text-mono-xs tracking-widest text-secondary font-medium">
              PROJECTS
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
