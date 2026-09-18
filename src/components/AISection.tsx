import React, { useState } from 'react';
import { Network, Brain, Cpu, Database, Eye, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const AI_NODES = [
  {
    id: 'ai',
    title: 'AI & COGNITION',
    icon: Brain,
    description: 'Foundation model fine-tuning, autonomous policy networks, and low-precision tensor operations.',
    telemetry: 'LATENCY: 1.4ms // TENSOR FLOPS: 840 TFLOPS'
  },
  {
    id: 'computation',
    title: 'COMPUTATION MATRIX',
    icon: Cpu,
    description: 'Neuromorphic spiking silicon, parallel GPU topologies, and quantized matrix multiplication pipelines.',
    telemetry: 'QUANTIZATION: INT4 // MEMORY BANDWIDTH: 3.2 TB/s'
  },
  {
    id: 'data',
    title: 'DATA EMBEDDINGS',
    icon: Database,
    description: 'High-dimensional vector stores, real-time semantic caching, and dynamic multimodal indices.',
    telemetry: 'VECTOR DIMENSION: 1536 // TOP-K SEARCH: 0.8ms'
  },
  {
    id: 'vision',
    title: 'COMPUTER VISION',
    icon: Eye,
    description: 'Multi-camera LiDAR fusion, neural radiance fields (NeRFs), and edge-accelerated object segmentation.',
    telemetry: 'FRAME RATE: 120 FPS // DETECTION CONFIDENCE: 99.4%'
  },
  {
    id: 'generative',
    title: 'GENERATIVE SYSTEMS',
    icon: Sparkles,
    description: 'Diffusion-based geometry generation, neural synthesis engines, and real-time audio-visual tokenization.',
    telemetry: 'DIFFUSION STEPS: 20 // LATENT COMPRESSION: 8X'
  }
];

export const AISection: React.FC = () => {
  const [activeNode, setActiveNode] = useState(AI_NODES[0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 py-20 pointer-events-none select-none">
      {/* Top Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 text-xs font-mono tracking-widest uppercase">
          <Network className="w-3.5 h-3.5" />
          <span>NEURAL SYNAPSE NEXUS // LAYER-06</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>SYNAPSE TOPOLOGY ACTIVE</span>
        </div>
      </div>

      {/* Center Cinematic Editorial */}
      <div className="text-center max-w-4xl mx-auto my-auto pointer-events-auto">
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight">
          INTELLIGENCE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
            MEETS
          </span>
          <br />
          IMAGINATION
        </h2>

        <p className="mt-6 max-w-xl mx-auto text-slate-300 font-tech text-base sm:text-lg leading-relaxed">
          From binary code to self-evolving cognition. Thousands of neural nodes fire across high-dimensional latent space.
        </p>

        {/* Interactive Neural Node Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {AI_NODES.map((node) => {
            const isSelected = activeNode.id === node.id;
            const Icon = node.icon;
            return (
              <button
                key={node.id}
                id={`ai-node-btn-${node.id}`}
                onClick={() => {
                  soundEngine.playClick(850);
                  setActiveNode(node);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{node.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Node Telemetry Card */}
        <div className="mt-6 max-w-xl mx-auto p-5 rounded-2xl border border-cyan-500/30 bg-[#060b18]/80 backdrop-blur-xl text-left shadow-xl shadow-cyan-950/40">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 uppercase mb-2">
            <span>NODE TELEMETRY INSPECTOR</span>
            <span className="text-slate-500">{activeNode.id.toUpperCase()}</span>
          </div>
          <h4 className="font-tech text-lg font-bold text-white mb-1">
            {activeNode.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {activeNode.description}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-cyan-300/90 flex items-center justify-between">
            <span>{activeNode.telemetry}</span>
            <span className="text-slate-500">OPTIMIZED</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="w-full max-w-6xl flex justify-between items-center text-xs font-mono text-slate-400 pointer-events-auto">
        <span>INTERACTIVE NEURAL NODES: 120 SYNAPTIC PATHWAYS</span>
        <span className="text-cyan-400">DIFFUSION & TRANSFORMER CO-PROCESSORS READY</span>
      </div>
    </section>
  );
};
