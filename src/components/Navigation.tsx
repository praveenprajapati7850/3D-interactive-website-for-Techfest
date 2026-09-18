import React, { useState } from 'react';
import { Volume2, VolumeX, Eye, Compass, ChevronRight, Sparkles, Activity } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavigationProps {
  currentSectionIndex: number;
  onJumpToSection: (index: number) => void;
  audioActive: boolean;
  onToggleAudio: () => void;
  interactiveMode: boolean;
  onToggleInteractive: () => void;
}

const SECTION_LABELS = [
  { index: 0, title: 'THE PORTAL', code: 'SEC-01 // PORTAL GATE' },
  { index: 1, title: '30TH EDITION', code: 'SEC-02 // 30 YR FRAGMENT' },
  { index: 2, title: 'UNIVERSE', code: 'SEC-03 // ORBITAL MATRIX' },
  { index: 3, title: 'COMPETITIONS', code: 'SEC-04 // CHALLENGE ARENA' },
  { index: 4, title: 'ROBOTICS', code: 'SEC-05 // KINEMATICS ARENA' },
  { index: 5, title: 'AI & NEURAL', code: 'SEC-06 // SYNAPSE NEXUS' },
  { index: 6, title: 'DRONES', code: 'SEC-07 // AERIAL MOBILITY' },
  { index: 7, title: 'WORKSHOPS', code: 'SEC-08 // HOLOGRAPHIC LAB' },
  { index: 8, title: 'THE PEOPLE', code: 'SEC-09 // CROWD MATRIX' },
  { index: 9, title: 'IIT BOMBAY', code: 'SEC-10 // CAMPUS VECTOR' },
  { index: 10, title: 'PARADIGM CORE', code: 'SEC-11 // CONVERGENCE' }
];

export const Navigation: React.FC<NavigationProps> = ({
  currentSectionIndex,
  onJumpToSection,
  audioActive,
  onToggleAudio,
  interactiveMode,
  onToggleInteractive
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentStage = SECTION_LABELS[currentSectionIndex] || SECTION_LABELS[0];

  const handleLinkClick = (idx: number) => {
    soundEngine.playClick(750);
    onJumpToSection(idx);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <div className="flex items-center justify-between pointer-events-auto bg-[#050914]/75 backdrop-blur-md border border-slate-800/80 rounded-full px-5 py-2.5 shadow-2xl shadow-cyan-950/20">
            {/* Brand / Identity */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleLinkClick(0)}
              id="nav-brand-logo"
            >
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/50 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
                <span className="font-display text-xs font-bold text-cyan-300">30</span>
                <div className="absolute inset-0 bg-cyan-400/10 animate-pulse pointer-events-none" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-sm font-bold tracking-widest text-white group-hover:text-cyan-300 transition-colors">
                    TECHFEST
                  </span>
                  <span className="text-slate-500 text-xs font-mono">|</span>
                  <span className="text-xs text-slate-300 font-mono tracking-wider">IIT BOMBAY</span>
                </div>
                <span className="text-[10px] text-cyan-400/80 tracking-widest font-mono">
                  30TH EDITION • 2026
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 text-xs font-tech tracking-wider text-slate-300">
              {SECTION_LABELS.map((sec) => {
                const isActive = sec.index === currentSectionIndex;
                return (
                  <button
                    key={sec.index}
                    id={`nav-link-${sec.index}`}
                    onClick={() => handleLinkClick(sec.index)}
                    onMouseEnter={() => soundEngine.playHover()}
                    className={`px-2.5 py-1 rounded transition-all duration-200 ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {sec.title}
                  </button>
                );
              })}
            </nav>

            {/* Quick Actions (Audio, Interaction, Jump Menu) */}
            <div className="flex items-center gap-2">
              {/* Soundscape Synthesizer */}
              <button
                id="nav-audio-toggle"
                onClick={onToggleAudio}
                title={audioActive ? 'Mute ambient soundscape' : 'Enable ambient sci-fi soundscape'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                  audioActive
                    ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {audioActive ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span className="hidden sm:inline text-[11px]">AUDIO ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">AUDIO</span>
                  </>
                )}
              </button>

              {/* Free-Look Drag Status indicator */}
              <button
                id="nav-interaction-toggle"
                onClick={onToggleInteractive}
                title="Interactive 3D Camera Controls (Drag to rotate scenes)"
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                  interactiveMode
                    ? 'border-violet-500/60 bg-violet-950/40 text-violet-300'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="text-[11px]">{interactiveMode ? 'FREE-LOOK ACTIVE' : '3D INTERACTION'}</span>
              </button>

              {/* Mobile / Compact Jump trigger */}
              <button
                id="nav-mobile-menu-trigger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden flex items-center justify-center w-9 h-9 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white"
                aria-label="Navigation Menu"
              >
                <Compass className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating Telemetry Breadcrumb Bar */}
          <div className="flex items-center justify-between mt-2 px-6 py-1 text-[11px] font-mono tracking-wider text-slate-400">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-300/90 font-semibold">{currentStage.code}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-slate-400">
                STAGE {String(currentSectionIndex + 1).padStart(2, '0')} / 11
              </span>
              <div className="w-24 bg-slate-800/80 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-violet-500 h-full transition-all duration-300"
                  style={{ width: `${((currentSectionIndex + 1) / 11) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col p-6 pointer-events-auto animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div>
              <h2 className="font-display text-base font-bold text-white tracking-widest">
                SIMULATION FLIGHT PLAN
              </h2>
              <p className="text-xs text-cyan-400 font-mono">TECHFEST 2026 // IIT BOMBAY</p>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 text-xs font-mono hover:text-white"
            >
              ESC / CLOSE
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-auto py-6 max-h-[75vh] overflow-y-auto">
            {SECTION_LABELS.map((sec) => (
              <button
                key={sec.index}
                onClick={() => handleLinkClick(sec.index)}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  sec.index === currentSectionIndex
                    ? 'border-cyan-500/60 bg-cyan-950/30 text-white shadow-lg shadow-cyan-950/50'
                    : 'border-slate-800/60 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono text-cyan-400/80">{sec.code}</div>
                  <div className="font-tech text-sm font-semibold tracking-wide text-white">{sec.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>30TH EDITION • SIMULATED PARADIGM</span>
            <span className="text-cyan-400">300+ EVENTS • 1,80,000+ FOOTFALL</span>
          </div>
        </div>
      )}
    </>
  );
};
