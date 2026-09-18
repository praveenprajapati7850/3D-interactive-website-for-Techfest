import React, { useState } from 'react';
import { CompetitionItem } from '../types';
import { TECHFEST_COMPETITIONS } from '../data';
import { Trophy, ArrowRight, X, ExternalLink, ShieldCheck, Filter } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface CompetitionArenaProps {
  selectedCompetition: CompetitionItem | null;
  onSelectCompetition: (comp: CompetitionItem | null) => void;
}

const CATEGORIES = ['ALL', 'DRONES', 'ROBOTICS', 'CODING', 'INNOVATION', 'ENGINEERING'];

export const CompetitionArena: React.FC<CompetitionArenaProps> = ({
  selectedCompetition,
  onSelectCompetition
}) => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredCompetitions = TECHFEST_COMPETITIONS.filter((comp) =>
    activeCategory === 'ALL' ? true : comp.category === activeCategory
  );

  const handleOpenDetail = (comp: CompetitionItem) => {
    soundEngine.playClick(800);
    onSelectCompetition(comp);
  };

  const handleCloseDetail = () => {
    soundEngine.playClick(500);
    onSelectCompetition(null);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 py-20 pointer-events-none select-none">
      {/* Header & Category Filters */}
      <div className="w-full max-w-6xl pointer-events-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>COMPETITION ECOSYSTEM // 2026</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
              CHALLENGE ARENA
            </h2>
            <p className="text-slate-400 font-tech text-sm sm:text-base mt-2 max-w-xl">
              Floating 3D challenge modules representing the official Techfest 2026 competition matrix. Select any module to inspect mission protocols.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase()}`}
                onClick={() => {
                  soundEngine.playClick(700);
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating 3D Challenge Modules Grid Overlay */}
      <div className="w-full max-w-6xl my-auto py-8 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCompetitions.slice(0, 8).map((comp) => {
            const isSelected = selectedCompetition?.id === comp.id;
            return (
              <div
                key={comp.id}
                id={`comp-card-${comp.id}`}
                onClick={() => handleOpenDetail(comp)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`group relative p-5 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-500/30 scale-[1.02]'
                    : 'border-slate-800/80 bg-[#080d1a]/70 hover:border-cyan-500/50 hover:bg-[#0a1224]/90'
                }`}
              >
                {/* Accent glow corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800/70 border border-slate-700/50">
                    {comp.category}
                  </span>
                  <span className="text-slate-500 font-semibold">{comp.track}</span>
                </div>

                <h3 className="font-tech text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {comp.name}
                </h3>

                <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed font-light">
                  {comp.tagline}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <span>INSPECT PROTOCOL</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info Prompt */}
      <div className="w-full max-w-6xl flex justify-between items-center text-xs font-mono text-slate-400 pointer-events-auto">
        <span>CLICK 3D MODULES OR CARDS TO EXPAND HOLOGRAPHIC BLUEPRINT</span>
        <span className="text-cyan-400">[REGISTRATION LINK] COMING SOON FOR TECHFEST 2026</span>
      </div>

      {/* Detailed Glass Holographic Modal on Selection */}
      {selectedCompetition && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/50 bg-[#060b18]/95 p-6 sm:p-8 shadow-2xl shadow-cyan-950/60">
            {/* Holographic Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-widest uppercase">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>OFFICIAL TECHFEST 2026 COMPETITION</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400">{selectedCompetition.category}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  {selectedCompetition.name}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  TRACK: {selectedCompetition.track}
                </div>
              </div>

              <button
                id="comp-modal-close"
                onClick={handleCloseDetail}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="py-6 space-y-4">
              <div>
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  MISSION BRIEF
                </h4>
                <p className="text-slate-200 font-tech text-base leading-relaxed">
                  {selectedCompetition.tagline}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  TECHNICAL SCOPE
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {selectedCompetition.shortDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  EVALUATION MATRIX & CRITERIA
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedCompetition.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80 text-xs font-mono text-cyan-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-[#040812] text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>SCHEDULE STATUS:</span>
                <span className="text-cyan-400 font-semibold">[DATE] TO BE ANNOUNCED</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400">
                OFFICIAL ECOSYSTEM • 30TH EDITION IIT BOMBAY
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCloseDetail}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 hover:text-white"
                >
                  CLOSE PANEL
                </button>
                <button
                  onClick={() => soundEngine.playClick(900)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-tech font-bold text-xs tracking-wider transition-all shadow-md shadow-cyan-500/20"
                >
                  <span>EXPLORE RULEBOOK</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
