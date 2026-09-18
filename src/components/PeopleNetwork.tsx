import React from 'react';
import { Users, Globe2, HeartHandshake, Sparkles } from 'lucide-react';
import { FESTIVAL_STATISTICS } from '../data';

export const PeopleNetwork: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 py-20 pointer-events-none select-none">
      {/* Top Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700/60 bg-slate-900/40 text-slate-300 text-xs font-mono tracking-widest uppercase">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>HUMAN INTELLIGENCE & GLOBAL FOOTPRINT // ZONE-09</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>GLOBAL NETWORK: 2,500+ SILHOUETTES CONNECTED</span>
        </div>
      </div>

      {/* Center Emotional Minimalist Typography & Stats */}
      <div className="text-center max-w-4xl mx-auto my-auto pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BEYOND THE SILICON</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
          WHERE MINDS
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-200 to-white">
            IGNITE THE FUTURE
          </span>
        </h2>

        <p className="mt-6 max-w-xl mx-auto text-slate-400 font-tech text-base sm:text-lg leading-relaxed">
          Technology is shaped by human ambition. Across 30 editions, thousands of students, engineers, developers, designers, and innovators have crossed the threshold of Techfest IIT Bombay.
        </p>

        {/* 3 Core Verified Statistics: Large, editorial, clean, high-contrast */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl border border-slate-800 bg-[#060a14]/60 backdrop-blur-md text-center">
            <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              {FESTIVAL_STATISTICS.footfall}
            </div>
            <div className="mt-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              FOOTFALL
            </div>
            <p className="mt-2 text-[11px] font-mono text-slate-500">
              Students, researchers, and global visionaries
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#060a14]/60 backdrop-blur-md text-center">
            <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              {FESTIVAL_STATISTICS.events}
            </div>
            <div className="mt-2 text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
              EVENTS
            </div>
            <p className="mt-2 text-[11px] font-mono text-slate-500">
              Competitions, summits, workshops & spectacles
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-[#060a14]/60 backdrop-blur-md text-center">
            <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              {FESTIVAL_STATISTICS.days} DAYS
            </div>
            <div className="mt-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              FESTIVAL
            </div>
            <p className="mt-2 text-[11px] font-mono text-slate-500">
              Non-stop immersion at the IIT Bombay campus
            </p>
          </div>
        </div>

        {/* Roles Silhouette Ticker */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">STUDENTS</span>
          <span>•</span>
          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">ENGINEERS</span>
          <span>•</span>
          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">DEVELOPERS</span>
          <span>•</span>
          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">DESIGNERS</span>
          <span>•</span>
          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300">INNOVATORS</span>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center text-xs font-mono text-slate-400 pointer-events-auto">
        <span>PARTICLE ARRAY: HUMAN SILHOUETTES LINKED VIA DIGITAL SYNAPSES</span>
        <span className="text-cyan-400">CONNECTING INDIA TO THE GLOBAL SCIENTIFIC DIALOGUE</span>
      </div>
    </section>
  );
};
