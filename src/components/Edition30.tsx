import React from 'react';
import { Layers, Sparkles, Orbit } from 'lucide-react';

export const Edition30: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 pointer-events-none select-none">
      <div className="max-w-5xl mx-auto w-full text-center pointer-events-auto">
        {/* Subtle Tech Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/20 text-violet-300 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MILESTONE PROTOCOL // 1998 — 2026</span>
        </div>

        {/* Big Editorial Typography */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white leading-tight">
          30 YEARS
        </h2>
        
        <div className="my-4">
          <span className="font-display text-xl sm:text-2xl font-light tracking-widest text-cyan-400">
            OF
          </span>
        </div>

        <h3 className="font-tech text-2xl sm:text-4xl md:text-5xl font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-200 to-violet-300">
          TECHNOLOGY • INNOVATION • EXPLORATION
        </h3>

        <p className="mt-8 max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          From a pioneering mechanical convention to Asia&apos;s pre-eminent science & technology symposium at IIT Bombay. Thousands of fragments reassemble into an autonomous paradigm.
        </p>

        {/* Milestone Statistics Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-xl border border-slate-800 bg-[#060a14]/60 backdrop-blur-md">
            <div className="text-2xl font-display font-bold text-cyan-400">30TH</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 uppercase">Historic Edition</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-[#060a14]/60 backdrop-blur-md">
            <div className="text-2xl font-display font-bold text-violet-400">1.8L+</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 uppercase">Footfall Magnitude</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-[#060a14]/60 backdrop-blur-md">
            <div className="text-2xl font-display font-bold text-cyan-400">300+</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 uppercase">Ecosystem Events</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-[#060a14]/60 backdrop-blur-md">
            <div className="text-2xl font-display font-bold text-violet-400">3 DAYS</div>
            <div className="text-[11px] font-mono text-slate-400 mt-1 uppercase">Continuous Conflux</div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
          <Orbit className="w-4 h-4 text-violet-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>PARTICLE SCULPTURE ASSEMBLING FROM CODE FRAGMENTS</span>
        </div>
      </div>
    </section>
  );
};
