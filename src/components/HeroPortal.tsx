import React from 'react';
import { ArrowDown, Cpu, ShieldAlert, Radio } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeroPortalProps {
  onEnterSimulation: () => void;
}

export const HeroPortal: React.FC<HeroPortalProps> = ({ onEnterSimulation }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 py-24 pointer-events-none select-none">
      {/* Top Telemetry Header */}
      <div className="w-full max-w-6xl flex justify-between items-center text-[11px] font-mono text-slate-400 tracking-widest pointer-events-auto">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>PARADIGM MATRIX: INITIALIZED // 30.0</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span>LAT: 19.1334° N</span>
          <span>LON: 72.9133° E</span>
          <span className="text-cyan-400">POWAI, MUMBAI</span>
        </div>
      </div>

      {/* Center Cinematic Typography */}
      <div className="text-center max-w-4xl mx-auto my-auto pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-8 backdrop-blur-sm">
          <Cpu className="w-3.5 h-3.5" />
          <span>IIT BOMBAY • 30TH EDITION</span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-none">
          TECHFEST
        </h1>

        <div className="mt-4 flex items-center justify-center gap-3 text-slate-400 font-mono text-sm tracking-widest">
          <span className="h-px w-12 bg-slate-700" />
          <span>SIMULATED PARADIGM</span>
          <span className="h-px w-12 bg-slate-700" />
        </div>

        <p className="mt-8 text-lg sm:text-2xl text-slate-300 font-tech font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
          Welcome to the 30th edition of Asia&apos;s largest science and technology festival.
        </p>

        {/* Action Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-enter-btn"
            onClick={() => {
              soundEngine.playClick(600);
              onEnterSimulation();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-8 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-tech font-bold text-sm tracking-widest transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 active:scale-95"
          >
            INITIALIZE SIMULATION
          </button>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="flex flex-col items-center gap-2 text-slate-400 pointer-events-auto">
        <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400/80">
          SCROLL TO TRAVERSE THE PORTAL
        </span>
        <div className="w-5 h-9 rounded-full border border-slate-700 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
