import React from 'react';
import { ArrowUp, Sparkles, Compass, Shield, Terminal, RefreshCw, ExternalLink } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface FinalExperienceProps {
  onRestartSimulation: () => void;
  onExploreCompetitions: () => void;
}

export const FinalExperience: React.FC<FinalExperienceProps> = ({
  onRestartSimulation,
  onExploreCompetitions
}) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 py-20 pointer-events-none select-none">
      {/* Top Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SINGULARITY CONVERGENCE // CORE STAGE-11</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>SIMULATION MATRIX CONVERGED</span>
        </div>
      </div>

      {/* Center Grand Reveal */}
      <div className="text-center max-w-4xl mx-auto my-auto pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/20 text-violet-300 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
          <span>THE 30TH CONVERGENCE</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-none">
          TECHFEST 2026
        </h2>

        <div className="mt-4 flex items-center justify-center gap-4 text-slate-400 font-mono text-sm sm:text-base tracking-widest">
          <span>IIT BOMBAY</span>
          <span>•</span>
          <span className="text-cyan-400 font-bold">30TH EDITION</span>
        </div>

        <div className="mt-8 font-tech text-xl sm:text-3xl text-slate-200 font-light tracking-wider">
          WELCOME TO THE SIMULATED PARADIGM
        </div>

        <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 font-light leading-relaxed">
          The simulation core pulses with the converged energies of AI, Robotics, Aerospace Swarms, and 1,80,000+ pioneering minds. Join the paradigm.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="final-explore-tf-btn"
            onClick={() => {
              soundEngine.playClick(900);
              onRestartSimulation();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-tech font-bold text-sm tracking-widest transition-all duration-300 shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>EXPLORE TECHFEST</span>
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            id="final-explore-comp-btn"
            onClick={() => {
              soundEngine.playClick(800);
              onExploreCompetitions();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-white font-tech font-semibold text-sm tracking-widest transition-all duration-300 hover:border-cyan-400 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <span>EXPLORE COMPETITIONS</span>
            <Compass className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Restart / Scroll to top prompt */}
        <div className="mt-12 flex items-center justify-center">
          <button
            onClick={() => {
              soundEngine.playClick(600);
              onRestartSimulation();
            }}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RE-ENTER SIMULATION AT THE PORTAL GATE</span>
          </button>
        </div>
      </div>

      {/* Footer Details (Strictly Verified, No Mock Data) */}
      <footer className="w-full max-w-6xl pt-8 border-t border-slate-800/80 pointer-events-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-wider">TECHFEST IIT BOMBAY</span>
            <span>•</span>
            <span>ASIA&apos;S LARGEST SCIENCE & TECH FESTIVAL</span>
          </div>

          <div className="flex items-center gap-6">
            <span>[DATE] TO BE ANNOUNCED</span>
            <span>[EVENT DETAILS]</span>
            <span>[REGISTRATION LINK]</span>
          </div>
        </div>
      </footer>
    </section>
  );
};
