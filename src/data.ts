import { TechDomain, CompetitionItem, WorkshopItem } from './types';

export const TECH_DOMAINS: TechDomain[] = [
  {
    id: 'ai',
    name: 'AI & NEURAL SYSTEMS',
    type: 'neural-network sphere',
    symbol: 'Ψ',
    description: 'Autonomous cognition, foundation models, reinforcement dynamics, and synthetic intelligence pathways.',
    highlight: 'Next-gen distributed transformer pipelines',
    subfields: ['Deep Learning', 'Neural Synthesis', 'Autonomous Cognition', 'Computer Vision'],
    color: '#38bdf8'
  },
  {
    id: 'robotics',
    name: 'ROBOTICS & AUTOMATION',
    type: 'robotic mechanism',
    symbol: '⚙',
    description: 'Kinematics, omnidirectional locomotion, bionic actuators, and multi-axis manipulators.',
    highlight: 'Adaptive field traversal systems',
    subfields: ['Bionic Actuation', 'SLAM Navigation', 'RoboWars Class', 'Swarm Mesh'],
    color: '#818cf8'
  },
  {
    id: 'drones',
    name: 'DRONES & AERIAL MOBILITY',
    type: 'miniature UAV',
    symbol: '▲',
    description: 'BVLOS swarm protocols, cycloidal propulsion systems, and resilient aerospace architectures.',
    highlight: 'Autonomous high-altitude swarm dynamics',
    subfields: ['CycloProp Thrust', 'BVLOS Swarm', 'Aerial Security', 'Telemetry HUD'],
    color: '#38bdf8'
  },
  {
    id: 'space',
    name: 'SPACE & SATELLITE TECH',
    type: 'orbital satellite',
    symbol: '✦',
    description: 'Orbital mechanics, nanosatellite instrumentation, interplanetary telemetry, and deep-space arrays.',
    highlight: 'Micro-gravity payload platforms',
    subfields: ['CubeSat Arrays', 'Orbital Mechanics', 'Deep Space Comms', 'Payload Recovery'],
    color: '#a855f7'
  },
  {
    id: 'coding',
    name: 'QUANTUM & CODE MATRICES',
    type: 'floating code cube',
    symbol: '<>',
    description: 'High-throughput algorithmic conflux, formal code audits, zero-knowledge proofs, and zero-code frameworks.',
    highlight: 'Sub-millisecond quantitative pipelines',
    subfields: ['Quantitative Conflux', 'Formal Verification', 'Compiler Logic', 'Algorithmic Optimization'],
    color: '#06b6d4'
  },
  {
    id: 'engineering',
    name: 'MECHANICAL & CIRCUITS',
    type: 'mechanical gear ring',
    symbol: '⎔',
    description: 'Advanced mechatronics, power microelectronics, thermodynamic cycles, and sustainable circuitry.',
    highlight: 'High-efficiency silicon-carbide topologies',
    subfields: ['EcoCircuit Design', 'Thermal Dynamics', 'Power Topologies', 'Stress Simulation'],
    color: '#60a5fa'
  },
  {
    id: 'innovation',
    name: 'ENERGY & EMERGING TECH',
    type: 'abstract energy core',
    symbol: '◈',
    description: 'Disruptive multidisciplinary frameworks, next-generation energy storage, and national frontier solutions.',
    highlight: 'Cross-paradigm innovation accelerators',
    subfields: ['Clean Hydrogen', 'Quantum Ensembles', 'Bio-Sensors', 'National Challenges'],
    color: '#c084fc'
  },
  {
    id: 'science',
    name: 'FUNDAMENTAL SCIENCES',
    type: 'orbital atom',
    symbol: '⬡',
    description: 'Stochastic mathematics, probabilistic modeling, particle physics, and condensed matter computing.',
    highlight: 'National Probability & Mathematical Conflux',
    subfields: ['Probability Theory', 'Condensed Matter', 'Quantum Optics', 'Stochastic Systems'],
    color: '#38bdf8'
  }
];

export const TECHFEST_COMPETITIONS: CompetitionItem[] = [
  {
    id: 'uav-x',
    name: 'UAV-X: RESILIENT BVLOS SWARM',
    category: 'DRONES',
    tagline: 'Beyond Visual Line of Sight multi-drone swarm resilience in complex signal-denied corridors.',
    shortDescription: 'Pioneer cooperative drone mesh coordination, autonomous mission execution, and telemetry integrity under severe RF disruption.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'AEROSPACE & AUTONOMY',
    details: ['Autonomous BVLOS routing', 'Dynamic RF jamming mitigation', 'Distributed target tracking']
  },
  {
    id: 'cycloprop',
    name: 'CYCLOPROP: ADVANCED UAV PROPULSION',
    category: 'DRONES',
    tagline: 'Revolutionary cycloidal and vector propulsion for ultra-maneuverable aerial systems.',
    shortDescription: 'Benchmark non-conventional aerodynamic propulsion, cyclic pitch blade dynamics, and extreme hovering stability.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'AEROSPACE PROPULSION',
    details: ['Cycloidal blade optimization', 'Thrust vectoring telemetry', 'Power efficiency curves']
  },
  {
    id: 'security-of-drones',
    name: 'SECURITY OF DRONES',
    category: 'DRONES',
    tagline: 'Defensive and offensive cybersecurity frameworks for aerial autonomous assets.',
    shortDescription: 'Analyze drone communication vulnerabilities, GPS spoofing countermeasures, and cryptographic command channel defenses.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'CYBERSECURITY & UAS',
    details: ['Anti-spoofing algorithms', 'Encrypted C2 links', 'Intrusion isolation protocols']
  },
  {
    id: 'code-auditor',
    name: 'CODE AUDITOR',
    category: 'CODING',
    tagline: 'Automated vulnerability scanning, formal verification, and binary defense dissection.',
    shortDescription: 'Deconstruct complex mission-critical codebases to eliminate zero-day vulnerabilities and memory safety exploits.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'SECURITY & SYSTEMS CODE',
    details: ['Static & dynamic analysis', 'Memory safety audits', 'Compiler-level verification']
  },
  {
    id: 'quant-code-conflux',
    name: 'QUANTITATIVE CODE CONFLUX',
    category: 'CODING',
    tagline: 'Ultra-low latency financial modeling, algorithmic market simulation, and stochastic computing.',
    shortDescription: 'Engineered for developers who push execution speeds to microsecond thresholds under high-volatility scenarios.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'ALGORITHMIC SYSTEMS',
    details: ['Microsecond order routing', 'Arbitrage stochastic models', 'High-frequency order books']
  },
  {
    id: 'national-probability',
    name: 'NATIONAL PROBABILITY CHALLENGE',
    category: 'CODING',
    tagline: 'Advanced mathematical conflux testing stochastic dominance, game theory, and combinatorics.',
    shortDescription: 'Compete in rigorous mathematical modeling of non-deterministic systems, Bayesian networks, and random matrices.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'MATHEMATICS & COMPUTATION',
    details: ['Bayesian decision theory', 'Markov chain convergence', 'Stochastic differential systems']
  },
  {
    id: 'namma-space',
    name: 'NAMMA SPACE',
    category: 'INNOVATION',
    tagline: 'Affordable satellite systems, orbital payloads, and regional space exploration challenges.',
    shortDescription: 'Design modular payload architectures for small satellites, orbital recovery modules, and atmospheric re-entry capsules.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'SPACE EXPLORATION',
    details: ['CubeSat payload housing', 'Orbital attitude control', 'Thermal vacuum survivability']
  },
  {
    id: 'oll-robotics',
    name: 'OLL ROBOTICS CHAMPIONSHIP',
    category: 'ROBOTICS',
    tagline: 'Flagship arena battle of high-torque, omni-directional tactical combat and autonomous robots.',
    shortDescription: 'Witness high-tensile steel, pneumatics, and precision wireless telemetry clash in an enclosed bulletproof battle arena.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'COMBAT & INDUSTRIAL ROBOTICS',
    details: ['High-kinetic weapons testing', 'Structural finite element analysis', 'Sub-millisecond failsafes']
  },
  {
    id: 'india-71-100',
    name: 'INDIA @71/100 CHALLENGE',
    category: 'INNOVATION',
    tagline: 'Grand technological blueprint for national self-reliance and mission-critical public infrastructure.',
    shortDescription: 'Propose and prototype moonshot engineering solutions addressing energy, water, logistics, and digital sovereign systems.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'NATIONAL IMPACT',
    details: ['Sovereign energy grids', 'Decentralized purification', 'Public digital infrastructure']
  },
  {
    id: 'ecocircuit',
    name: 'ECOCIRCUIT',
    category: 'ENGINEERING',
    tagline: 'Next-generation circular electronics, biodegradable substrates, and zero-waste power systems.',
    shortDescription: 'Engineer electronic systems with eco-friendly substrates, minimal carbon footprints, and high electrical efficiency.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'SUSTAINABLE HARDWARE',
    details: ['Transient biodegradable PCBs', 'Recycled copper pathways', 'High-efficiency thermal layout']
  },
  {
    id: 'thetashift',
    name: 'THETASHIFT',
    category: 'INNOVATION',
    tagline: 'Next-generation quantum-inspired computing and non-von-Neumann hardware acceleration.',
    shortDescription: 'Develop algorithms for neuromorphic architectures, annealers, and quantum simulator benchmarks.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'EMERGING ARCHITECTURES',
    details: ['Quantum annealing mapping', 'Spiking neural networks', 'Energy-delay product profiling']
  },
  {
    id: 'roboreach',
    name: 'ROBOREACH',
    category: 'ROBOTICS',
    tagline: 'Precision 6-DOF robotic manipulator handling hazardous environments and micro-assembly.',
    shortDescription: 'Design robotic arms capable of sub-millimeter dexterity, inverse kinematics calculations, and force feedback.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'INDUSTRIAL KINEMATICS',
    details: ['Closed-loop torque sensing', 'Inverse kinematic solver', 'Micro-grip tactile surfaces']
  },
  {
    id: 'meshmerize',
    name: 'MESHMERIZE',
    category: 'ROBOTICS',
    tagline: 'Autonomous maze-solving micro-robots with dynamic obstacle remapping.',
    shortDescription: 'High-speed autonomous exploration of reconfigurable geometric corridors using onboard ultrasonic and LiDAR arrays.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'AUTONOMOUS NAVIGATION',
    details: ['Flood-fill corridor mapping', 'High-RPM brushed micromotors', 'Wall-following PID controllers']
  },
  {
    id: 'zerocode',
    name: 'ZEROCODE',
    category: 'CODING',
    tagline: 'Next-generation declarative architecture and model-driven application orchestration.',
    shortDescription: 'Build robust enterprise-grade distributed microservices using purely declarative, visual, and constraint-based pipelines.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'SYSTEMS ARCHITECTURE',
    details: ['Declarative data pipelines', 'Model-driven schema engines', 'Autonomous deployment graph']
  },
  {
    id: 'innovatex',
    name: 'INNOVATEX',
    category: 'INNOVATION',
    tagline: 'Open innovation incubator for breakthrough hardware and deep-tech inventions.',
    shortDescription: 'The premier platform for student patent-holders, deep-tech researchers, and engineering visionaries.',
    status: '[EVENT DETAILS] Available in Official Rulebook',
    track: 'DEEP TECH VENTURES',
    details: ['TRL-4+ working prototypes', 'Intellectual property assessment', 'Commercial viability roadmaps']
  }
];

export const TECHFEST_WORKSHOPS: WorkshopItem[] = [
  {
    id: 'ws-genai',
    title: 'GENERATIVE AI & MULTIMODAL ARCHITECTURES',
    category: 'AI & MACHINE LEARNING',
    level: 'ADVANCED LAB',
    abstract: 'Hands-on architectural exploration into diffusion mechanics, latent space embeddings, and attention head pruning.',
    modules: ['Transformer Attention Mathematics', 'Latent Diffusion Pipelines', 'LoRA Fine-tuning Techniques', 'Vector Search & Embeddings']
  },
  {
    id: 'ws-autonomous-vision',
    title: 'COMPUTER VISION FOR AUTONOMOUS SYSTEMS',
    category: 'COMPUTER VISION',
    level: 'APPLIED ENGINEERING',
    abstract: 'Real-time multi-object tracking, 3D point-cloud LiDAR fusion, and edge-tensor optimization for robotic navigation.',
    modules: ['YOLO TensorRT Acceleration', 'Point-Cloud LiDAR Segmentation', 'Stereo Depth Triangulation', 'Visual Odometry & SLAM']
  },
  {
    id: 'ws-embedded-robotics',
    title: 'HIGH-PERFORMANCE ROBOTIC CONTROL & ROS2',
    category: 'ROBOTICS & EMBEDDED',
    level: 'HANDS-ON LABORATORY',
    abstract: 'Direct hardware synthesis of deterministic real-time Linux kernels, CAN bus telemetry, and inverse kinematics on STM32/ESP32.',
    modules: ['ROS2 Node Architecture', 'Real-Time CAN Bus Topology', 'PID Feedback Kinematics', 'Micro-ROS Microcontrollers']
  },
  {
    id: 'ws-drone-swarms',
    title: 'UAV SWARM MESH & AUTONOMOUS FLIGHT',
    category: 'AEROSPACE & DRONES',
    level: 'RESEARCH PRACTICUM',
    abstract: 'Decentralized leader-follower algorithms, Mavlink communications, and collision avoidance in GPS-denied environments.',
    modules: ['BVLOS Telemetry Protocols', 'Consensus Algorithms for Swarms', 'Optical Flow Position Hold', 'Failsafe Return-to-Home Systems']
  },
  {
    id: 'ws-distributed-systems',
    title: 'DISTRIBUTED SYSTEMS & EDGE COMPUTING',
    category: 'SYSTEMS & CLOUD',
    level: 'SYSTEM ARCHITECTURE',
    abstract: 'High-throughput gRPC message queues, raft consensus clustering, and low-latency edge deployment for sensor streams.',
    modules: ['Raft Consensus Internals', 'gRPC Streaming Serialization', 'Edge WebAssembly Compute', 'Zero-Loss Telemetry Pipelines']
  }
];

export const FESTIVAL_STATISTICS = {
  footfall: '1,80,000+',
  events: '300+',
  days: '3',
  edition: '30TH',
  year: '2026',
  campus: 'IIT BOMBAY, MUMBAI',
  tagline: 'WELCOME TO THE SIMULATED PARADIGM',
  statusPlaceholders: {
    eventDetails: '[EVENT DETAILS]',
    date: '[DATE]',
    registrationLink: '[REGISTRATION LINK]',
    officialDescription: '[OFFICIAL DESCRIPTION]'
  }
};
