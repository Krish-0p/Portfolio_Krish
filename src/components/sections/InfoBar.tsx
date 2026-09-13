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

  const items = [
    {
      index: '01',
      label: 'BASED IN MUMBAI,',
      value: loading ? 'FETCHING WEATHER...' : `${weather?.desc}, ${weather?.temp}°C`,
      live: true,
    },
    { index: '02', label: 'PRODUCT DESIGNER,', value: 'Fullstack', live: false },
    { index: '03', label: 'AVAILABLE FOR,', value: 'PROJECTS', live: true },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full border-t border-b overflow-hidden"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--color-root)' }}
    >
      {/* Line grid, same language as the hero */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="infobar-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#infobar-grid)" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.06)]">
        {items.map((item, i) => (
          <motion.div
            key={item.index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col justify-between gap-6 sm:gap-8 md:gap-14 px-6 md:px-10 lg:px-12 py-8 sm:py-10 md:py-16 cursor-default"
          >
            {/* Accent edge that draws in on hover */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-px bg-accent origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
            />

            {/* Top rail: index — rule — status */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.22em] text-accent/60 group-hover:text-accent transition-colors duration-300 tabular-nums">
                {item.index}
              </span>
              <span className="h-px flex-1 bg-white/[0.06] group-hover:bg-white/[0.12] transition-colors duration-300" />
              <span
                aria-hidden="true"
                className={`w-1.5 h-1.5 rounded-full bg-accent ${
                  item.live ? 'animate-pulse shadow-glow-sm' : 'opacity-25'
                }`}
              />
            </div>

            {/* Label + value */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <span className="font-mono text-mono-xs tracking-widest uppercase text-white/30 group-hover:text-white/50 transition-colors duration-300">
                {item.label}
              </span>

              <div className="flex flex-col gap-3">
                <span className="font-display text-[1.375rem] sm:text-2xl lg:text-3xl leading-[1.05] tracking-tight text-white/90 group-hover:text-white transition-colors duration-300 tabular-nums">
                  {item.value}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-accent/70 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
