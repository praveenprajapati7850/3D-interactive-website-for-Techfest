import React from 'react';
import { Bot, Move3d, Compass, ShieldAlert, Cpu } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface RoboticsSectionProps {
  interactiveMode: boolean;
  onToggleInteractive: () => void;
}

export const RoboticsSection: React.FC<RoboticsSectionProps> = ({
  interactiveMode,
  onToggleInteractive
}) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 py-20 pointer-events-none select-none">
      {/* Top Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/20 text-indigo-300 text-xs font-mono tracking-widest uppercase">
          <Bot className="w-3.5 h-3.5" />
          <span>ROBOTICS & MECHATRONICS SECTOR // ZONE-05</span>
        </div>

        <button
          onClick={() => {
            soundEngine.playClick(650);
            onToggleInteractive();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
            interactiveMode
              ? 'border-indigo-400 bg-indigo-950/40 text-indigo-300'
              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <Move3d className="w-3.5 h-3.5" />
          <span>CLICK & DRAG TO ORBIT ROBOTICS ARENA</span>
        </button>
      </div>

      {/* Center Cinematic Editorial */}
      <div className="text-center max-w-4xl mx-auto my-auto pointer-events-auto">
        <div className="flex flex-col items-center justify-center gap-2 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            BUILD.
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-300 to-blue-400">
            CONTROL.
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400">
            CONQUER.
          </span>
        </div>

        <p className="mt-8 max-w-xl mx-auto text-slate-300 font-tech text-base sm:text-lg leading-relaxed">
          Traverse the autonomous obstacle course. High-tensile steel, CAN bus sensors, and inverse kinematics clash across ramps, moving platforms, and dynamic hazards.
        </p>

        {/* Rover Telemetry HUD Widget */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left">
          <div className="p-3 rounded-lg border border-slate-800 bg-[#060a14]/80 backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 block">LOCOMOTION STATUS</span>
            <span className="text-xs font-tech font-bold text-cyan-400 mt-0.5 block">6WD TERRAIN TRAVERSAL</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-[#060a14]/80 backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 block">MANIPULATOR ARM</span>
            <span className="text-xs font-tech font-bold text-indigo-400 mt-0.5 block">6-DOF KINEMATICS ACTIVE</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-[#060a14]/80 backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 block">OBSTACLE CLEARANCE</span>
            <span className="text-xs font-tech font-bold text-cyan-400 mt-0.5 block">ROTARY HAZARDS AVOIDED</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-[#060a14]/80 backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 block">ARENA CLASS</span>
            <span className="text-xs font-tech font-bold text-indigo-400 mt-0.5 block">ROBOWARS & OLL FLAGSHIP</span>
          </div>
        </div>
      </div>

      {/* Bottom instructions */}
      <div className="w-full max-w-6xl flex justify-between items-center text-xs font-mono text-slate-400 pointer-events-auto">
        <span className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span>AUTONOMOUS FEEDBACK LOOP // REAL-TIME ROS2 STACK</span>
        </span>
        <span className="hidden sm:inline">DRAG MOUSE OVER CANVAS TO ROTATE ARENA VIEW</span>
      </div>
    </section>
  );
};
