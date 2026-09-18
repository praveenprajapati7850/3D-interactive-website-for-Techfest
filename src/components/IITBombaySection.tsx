import React from 'react';
import { MapPin, Landmark, Trees, Waves } from 'lucide-react';

export const IITBombaySection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 py-20 pointer-events-none select-none">
      {/* Top Campus HUD */}
      <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 text-xs font-mono tracking-widest uppercase">
          <Landmark className="w-3.5 h-3.5" />
          <span>CAMPUS MATRIX // IIT BOMBAY // ZONE-10</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <MapPin className="w-3.5 h-3.5" />
            POWAI, MUMBAI
          </span>
          <span className="hidden sm:inline">ELEVATION: 50M // LAKE POWAI FRONT</span>
        </div>
      </div>

      {/* Center Cinematic Editorial */}
      <div className="text-center max-w-4xl mx-auto my-auto pointer-events-auto">
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight">
          WHERE IDEAS
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
            BECOME REAL
          </span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-slate-300 font-tech text-base sm:text-lg leading-relaxed font-light">
          Nestled between Powai Lake and the Sanjay Gandhi hills, the iconic Indian Institute of Technology Bombay transforms every year into the epicenter of technological civilization.
        </p>

        {/* Abstract Campus Architectural Features */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="p-4 rounded-xl border border-slate-800 bg-[#060b18]/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
              <Landmark className="w-4 h-4" />
              <span>MAIN BUILDING CANOPY</span>
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Stylized 3D architectural massing representing the timeless heart of the IIT Bombay campus.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-[#060b18]/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-mono mb-1">
              <Waves className="w-4 h-4" />
              <span>POWAI LAKE REFLECTIONS</span>
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Dark metallic reflection plane mirroring the night sky and the floating festival gate.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-[#060b18]/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono mb-1">
              <Trees className="w-4 h-4" />
              <span>TECHFEST PORTAL GATE</span>
            </div>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              The glowing simulated portal suspended above the campus grounds, beckoning the future.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center text-xs font-mono text-slate-400 pointer-events-auto">
        <span>GEOLOCATION: 19°08&apos;00.2&quot;N 72°54&apos;47.9&quot;E</span>
        <span className="text-cyan-400">INSTITUTION OF EMINENCE • EST. 1958</span>
      </div>
    </section>
  );
};
