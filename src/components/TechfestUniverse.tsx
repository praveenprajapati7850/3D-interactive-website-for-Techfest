import React from 'react';
import { TechDomain } from '../types';
import { TECH_DOMAINS } from '../data';
import { Globe, ArrowUpRight, Zap, Radio } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface TechfestUniverseProps {
  selectedDomain: TechDomain | null;
  hoveredDomain: TechDomain | null;
  onSelectDomain: (domain: TechDomain | null) => void;
}

export const TechfestUniverse: React.FC<TechfestUniverseProps> = ({
  selectedDomain,
  hoveredDomain,
  onSelectDomain
}) => {
  const activeDomain = hoveredDomain || selectedDomain;

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 py-20 pointer-events-none select-none">
      {/* Header telemetry */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-auto">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>ORBITAL PARADIGM // 08 DOMAINS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
            THE TECHFEST UNIVERSE
          </h2>
          <p className="text-slate-400 font-tech text-sm sm:text-base mt-2 max-w-xl">
            At the gravitational center lies Techfest. Orbiting around it are the core technological frontiers driving the 30th edition.
          </p>
        </div>

        {/* Orbit status indicator */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 bg-slate-900/60 border border-slate-800 rounded-lg p-3 backdrop-blur-md">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <div className="text-slate-300 font-semibold">DYNAMIC ORBITAL TRACKING</div>
            <div className="text-[10px] text-cyan-400/80">HOVER OBJECT TO ENGAGE TELEMETRY</div>
          </div>
        </div>
      </div>

      {/* Floating Interactive Domain Card (Updates live on 3D hover or click) */}
      <div className="w-full max-w-xl mx-auto my-auto pointer-events-auto transition-all duration-300">
        {activeDomain ? (
          <div className="p-6 rounded-2xl border border-cyan-500/40 bg-[#060b18]/85 backdrop-blur-xl shadow-2xl shadow-cyan-950/50">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                  ACTIVE SATELLITE: {activeDomain.type}
                </span>
                <h3 className="text-2xl font-display font-bold text-white tracking-wide mt-1">
                  {activeDomain.name}
                </h3>
              </div>
              <span className="text-2xl text-cyan-300 font-mono font-bold bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-500/30">
                {activeDomain.symbol}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed font-light">
              {activeDomain.description}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                CORE TECHNICAL PATHWAYS:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeDomain.subfields.map((sub, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-cyan-200 border border-slate-700/60 font-mono"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-cyan-400/90 pt-3 border-t border-slate-800/60">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                {activeDomain.highlight}
              </span>
              <button
                onClick={() => onSelectDomain(null)}
                className="text-slate-400 hover:text-white underline cursor-pointer"
              >
                DISENGAGE FOCUS
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-slate-800/80 bg-[#060b18]/60 backdrop-blur-md text-center">
            <Radio className="w-6 h-6 text-cyan-400 mx-auto animate-pulse mb-2" />
            <div className="text-sm font-tech font-semibold text-slate-200">
              SATELLITE TELEMETRY READY
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Hover over or click any orbiting 3D sphere, UAV, satellite, or cube in the canvas to inspect its technological domain.
            </p>
          </div>
        )}
      </div>

      {/* Quick Domain Selector Pills */}
      <div className="w-full max-w-4xl pointer-events-auto">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {TECH_DOMAINS.map((domain) => {
            const isSelected = activeDomain?.id === domain.id;
            return (
              <button
                key={domain.id}
                id={`domain-pill-${domain.id}`}
                onClick={() => {
                  soundEngine.playClick(680);
                  onSelectDomain(domain);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {domain.symbol} {domain.name.split('&')[0].trim()}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
