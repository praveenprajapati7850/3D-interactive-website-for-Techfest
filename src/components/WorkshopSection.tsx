import React, { useState } from 'react';
import { BookOpen, Layers, Sparkles, Terminal, Code, RotateCw } from 'lucide-react';
import { TECHFEST_WORKSHOPS } from '../data';
import { soundEngine } from '../utils/audio';

const WORKSHOP_PILLARS = [
  { id: 'ai', name: 'AI', tag: 'TRANSFORMERS & LOGIC' },
  { id: 'deep-learning', name: 'DEEP LEARNING', tag: 'NEURAL BACKPROP' },
  { id: 'computer-vision', name: 'COMPUTER VISION', tag: 'LIDAR & SEGMENTATION' },
  { id: 'generative-ai', name: 'GENERATIVE AI', tag: 'LATENT DIFFUSION' },
  { id: 'robotics', name: 'ROBOTICS', tag: 'ROS2 & KINEMATICS' },
  { id: 'web-tech', name: 'WEB TECHNOLOGY', tag: 'EDGE SYSTEMS & WASM' }
];

export const WorkshopSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState(WORKSHOP_PILLARS[0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 py-20 pointer-events-none select-none">
      {/* Top Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-950/20 text-teal-300 text-xs font-mono tracking-widest uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          <span>HOLOGRAPHIC LABORATORY // ZONE-08</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <RotateCw className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>HOLO-WORKSTATION PROJECTOR ACTIVE</span>
        </div>
      </div>

      {/* Center Cinematic Editorial */}
      <div className="text-center max-w-4xl mx-auto my-auto pointer-events-auto">
        <div className="flex items-center justify-center gap-4 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400">
            LEARN.
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            BUILD.
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-300">
            EXPERIMENT.
          </span>
        </div>

        <p className="mt-6 max-w-xl mx-auto text-slate-300 font-tech text-base sm:text-lg leading-relaxed">
          The research proving ground of Techfest. Step into the holographic workstation where developers, researchers, and students test real hardware and algorithms.
        </p>

        {/* Floating Holographic Pillar Panels */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          {WORKSHOP_PILLARS.map((p) => {
            const isSelected = selectedPillar.id === p.id;
            return (
              <button
                key={p.id}
                id={`ws-pillar-${p.id}`}
                onClick={() => {
                  soundEngine.playClick(720);
                  setSelectedPillar(p);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`flex flex-col items-center px-4 py-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-teal-400 bg-teal-950/40 text-teal-200 shadow-md shadow-teal-500/20 scale-105'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className="font-tech text-xs font-bold tracking-wider">{p.name}</span>
                <span className="text-[10px] font-mono text-teal-400/80 mt-0.5">{p.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Holographic Workshop Blueprint Card */}
        <div className="mt-6 max-w-2xl mx-auto p-5 rounded-2xl border border-teal-500/30 bg-[#060e18]/85 backdrop-blur-xl text-left shadow-xl shadow-teal-950/30">
          <div className="flex items-center justify-between text-xs font-mono text-teal-400 uppercase mb-2">
            <span>WORKSHOP BLUEPRINT // 30TH EDITION</span>
            <span className="px-2 py-0.5 rounded bg-teal-950/60 border border-teal-500/40 text-[10px]">
              {selectedPillar.name} LAB
            </span>
          </div>

          <h4 className="font-tech text-lg font-bold text-white mb-2">
            ADVANCED {selectedPillar.name} PRACTICUM
          </h4>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
            Hands-on technical immersion led by academic faculty and industrial leaders. Students architect, code, and deploy directly into physical hardware or edge cloud clusters.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-300">
            <div>
              <span className="text-slate-500 block">FORMAT:</span>
              <span className="text-teal-300">HANDS-ON LAB</span>
            </div>
            <div>
              <span className="text-slate-500 block">SCHEDULE:</span>
              <span className="text-teal-300">[DATE]</span>
            </div>
            <div>
              <span className="text-slate-500 block">DETAILS:</span>
              <span className="text-teal-300">[EVENT DETAILS]</span>
            </div>
            <div>
              <span className="text-slate-500 block">PORTAL:</span>
              <span className="text-teal-300">[REGISTRATION LINK]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center text-xs font-mono text-slate-400 pointer-events-auto">
        <span>3D HOLOGRAPHIC EMITTER: MULTI-AXIS TORUS KNOT DATASTREAM</span>
        <span className="text-teal-400">PRACTICAL HARDWARE-IN-THE-LOOP CURRICULUM</span>
      </div>
    </section>
  );
};
