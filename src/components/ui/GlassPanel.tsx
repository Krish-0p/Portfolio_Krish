import React from 'react';

interface GlassPanelProps {
  className?: string;
  children: React.ReactNode;
}

export default function GlassPanel({ className = '', children }: GlassPanelProps) {
  return (
    <div className={`bg-white/[0.02] border border-white/[0.06] rounded-subtle backdrop-blur-glass ${className}`}>
      {children}
    </div>
  );
}
