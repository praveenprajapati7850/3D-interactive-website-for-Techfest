import React from 'react';
import { Navigation as CompassIcon, Radio, Shield, Wind, Crosshair } from 'lucide-react';

export const DroneSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 py-20 pointer-events-none select-none">
      {/* Top Aerial HUD */}
      <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-950/20 text-sky-300 text-xs font-mono tracking-widest uppercase">
          <CompassIcon className="w-3.5 h-3.5" />
          <span>AERIAL MOBILITY & SWARM CORRIDOR // ZONE-07</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-sky-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            BVLOS MESH SYNCHRONIZED
          </span>
          <span className="hidden sm:inline">ALTITUDE: 140M AGL</span>
        </div>
      </div>

      {/* Center Cinematic Editorial */}
      <div className="text-center max-w-4xl mx-auto my-auto pointer-events-auto">
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight">
          THE FUTURE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-300 to-blue-400">
            IS IN MOTION
          </span>
        </h2>

        <p className="mt-6 max-w-xl mx-auto text-slate-300 font-tech text-base sm:text-lg leading-relaxed">
          Inspired by flagship challenges like UAV-X, CycloProp, and Drone Cybersecurity. Move your cursor to command the flagship UAV across the aerial grid.
        </p>

        {/* 3 Conceptual HUD Badges as explicitly requested */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="p-4 rounded-xl border border-sky-500/30 bg-[#060b18]/80 backdrop-blur-md text-left">
            <div className="flex items-center justify-between mb-2">
              <Crosshair className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] font-mono text-slate-500">SYS-01</span>
            </div>
            <h4 className="font-tech text-sm font-bold text-white tracking-wide">
              AUTONOMOUS SYSTEM
            </h4>
            <p className="text-xs text-slate-400 mt-1 font-light">
              BVLOS obstacle avoidance, optical flow localization, and fail-safe inertial guidance.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-sky-500/30 bg-[#060b18]/80 backdrop-blur-md text-left">
            <div className="flex items-center justify-between mb-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono text-slate-500">SYS-02</span>
            </div>
            <h4 className="font-tech text-sm font-bold text-white tracking-wide">
              SWARM INTELLIGENCE
            </h4>
            <p className="text-xs text-slate-400 mt-1 font-light">
              Decentralized consensus algorithms, mesh communication, and cooperative tracking.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-sky-500/30 bg-[#060b18]/80 backdrop-blur-md text-left">
            <div className="flex items-center justify-between mb-2">
              <Wind className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-mono text-slate-500">SYS-03</span>
            </div>
            <h4 className="font-tech text-sm font-bold text-white tracking-wide">
              AERIAL MOBILITY
            </h4>
            <p className="text-xs text-slate-400 mt-1 font-light">
              Cycloidal propulsion, thrust-vectoring aerodynamics, and high-efficiency endurance.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom HUD Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center text-xs font-mono text-slate-400 pointer-events-auto">
        <span className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-sky-400" />
          <span>CYBERSECURITY LINK: AES-256 TELEMETRY STREAM</span>
        </span>
        <span className="hidden sm:inline">CENTRAL DRONE DYNAMICS TRACKING CURSOR TRAJECTORY</span>
      </div>
    </section>
  );
};
