import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SimulationSectionId, TechDomain, CompetitionItem } from '../types';
import { TECH_DOMAINS, TECHFEST_COMPETITIONS } from '../data';
import { soundEngine } from '../utils/audio';

interface ThreeCanvasProps {
  scrollProgress: number; // 0 to 1 across whole page
  currentSectionIndex: number;
  onHoverDomain: (domain: TechDomain | null) => void;
  onSelectDomain: (domain: TechDomain | null) => void;
  onSelectCompetition: (comp: CompetitionItem | null) => void;
  selectedCompetition: CompetitionItem | null;
  selectedDomain: TechDomain | null;
  interactiveMode: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  scrollProgress,
  currentSectionIndex,
  onHoverDomain,
  onSelectDomain,
  onSelectCompetition,
  selectedCompetition,
  selectedDomain,
  interactiveMode
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep references to mutable state for animation loop
  const stateRef = useRef({
    scrollProgress: 0,
    currentSectionIndex: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    userRotX: 0,
    userRotY: 0,
    targetUserRotX: 0,
    targetUserRotY: 0,
    hoveredDomainId: null as string | null,
    selectedCompetitionId: null as string | null,
    selectedDomainId: null as string | null,
    interactiveMode: false
  });

  stateRef.current.scrollProgress = scrollProgress;
  stateRef.current.currentSectionIndex = currentSectionIndex;
  stateRef.current.selectedCompetitionId = selectedCompetition?.id || null;
  stateRef.current.selectedDomainId = selectedDomain?.id || null;
  stateRef.current.interactiveMode = interactiveMode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060c, 0.018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Raycaster for interactions
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0x38bdf8, 3.5, 60, Math.PI / 4, 0.3, 1);
    mainSpot.position.set(0, 20, 25);
    scene.add(mainSpot);

    const violetAccent = new THREE.PointLight(0xa855f7, 2.5, 45);
    violetAccent.position.set(-15, -5, 10);
    scene.add(violetAccent);

    const cyanAccent = new THREE.PointLight(0x06b6d4, 2.5, 45);
    cyanAccent.position.set(15, 8, -5);
    scene.add(cyanAccent);

    // Subtle volumetric dust particle field spanning all scenes
    const bgDustCount = 1200;
    const bgDustGeo = new THREE.BufferGeometry();
    const bgDustPos = new Float32Array(bgDustCount * 3);
    const bgDustColors = new Float32Array(bgDustCount * 3);
    for (let i = 0; i < bgDustCount; i++) {
      bgDustPos[i * 3] = (Math.random() - 0.5) * 80;
      bgDustPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      bgDustPos[i * 3 + 2] = (Math.random() - 0.5) * 160;

      const isCyan = Math.random() > 0.4;
      bgDustColors[i * 3] = isCyan ? 0.2 : 0.6;
      bgDustColors[i * 3 + 1] = isCyan ? 0.7 : 0.3;
      bgDustColors[i * 3 + 2] = 0.95;
    }
    bgDustGeo.setAttribute('position', new THREE.BufferAttribute(bgDustPos, 3));
    bgDustGeo.setAttribute('color', new THREE.BufferAttribute(bgDustColors, 3));

    const bgDustMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const bgDust = new THREE.Points(bgDustGeo, bgDustMat);
    scene.add(bgDust);

    // ==========================================
    // SECTION 1: THE PORTAL
    // ==========================================
    const portalGroup = new THREE.Group();
    scene.add(portalGroup);

    // Central geometric singularity: Polyhedron core
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreWireGeo = new THREE.WireframeGeometry(coreGeo);
    const coreWireMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 1.5, transparent: true, opacity: 0.85 });
    const coreWire = new THREE.LineSegments(coreWireGeo, coreWireMat);
    portalGroup.add(coreWire);

    const innerCoreGeo = new THREE.OctahedronGeometry(0.9, 0);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    portalGroup.add(innerCore);

    // Concentric Torus Rings forming the Portal Gate
    const portalRings: THREE.Mesh[] = [];
    const ringRadii = [3.2, 4.6, 6.2, 8.0, 10.5];
    ringRadii.forEach((r, idx) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.04 + idx * 0.02, 16, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx % 2 === 0 ? 0x38bdf8 : 0x818cf8,
        transparent: true,
        opacity: 0.65 - idx * 0.08
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -idx * 1.8;
      portalGroup.add(ring);
      portalRings.push(ring);
    });

    // Portal grid horizon plane
    const portalGrid = new THREE.GridHelper(60, 40, 0x0284c7, 0x1e293b);
    portalGrid.position.set(0, -6, -10);
    portalGroup.add(portalGrid);

    // ==========================================
    // SECTION 2: 30TH EDITION PARTICLE SCULPTURE
    // ==========================================
    const editionGroup = new THREE.Group();
    editionGroup.position.set(0, -35, 0);
    scene.add(editionGroup);

    // Generate 3D point cloud forming "30"
    const particle30Count = 1800;
    const p30TargetPos: THREE.Vector3[] = [];
    const p30ChaosPos: THREE.Vector3[] = [];
    const p30CurrentPos = new Float32Array(particle30Count * 3);
    const p30Colors = new Float32Array(particle30Count * 3);

    // Construct points for "3" and "0"
    const halfCount = Math.floor(particle30Count / 2);
    // Digit '3': Two stacked arcs
    for (let i = 0; i < halfCount; i++) {
      const isTopArc = i < halfCount * 0.5;
      const angle = isTopArc
        ? (i / (halfCount * 0.5)) * Math.PI * 1.4 - Math.PI * 0.2
        : ((i - halfCount * 0.5) / (halfCount * 0.5)) * Math.PI * 1.4 - Math.PI * 0.7;
      const r = 2.4 + (Math.random() - 0.5) * 0.3;
      const cy = isTopArc ? 1.8 : -1.8;
      const x = -3.8 + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      const z = (Math.random() - 0.5) * 1.2;
      p30TargetPos.push(new THREE.Vector3(x, y, z));
      p30ChaosPos.push(new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20));
    }
    // Digit '0': Ellipse
    for (let i = halfCount; i < particle30Count; i++) {
      const angle = ((i - halfCount) / halfCount) * Math.PI * 2;
      const rx = 2.2 + (Math.random() - 0.5) * 0.3;
      const ry = 3.6 + (Math.random() - 0.5) * 0.3;
      const x = 3.6 + Math.cos(angle) * rx;
      const y = Math.sin(angle) * ry;
      const z = (Math.random() - 0.5) * 1.2;
      p30TargetPos.push(new THREE.Vector3(x, y, z));
      p30ChaosPos.push(new THREE.Vector3((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20));
    }

    for (let i = 0; i < particle30Count; i++) {
      p30CurrentPos[i * 3] = p30ChaosPos[i].x;
      p30CurrentPos[i * 3 + 1] = p30ChaosPos[i].y;
      p30CurrentPos[i * 3 + 2] = p30ChaosPos[i].z;

      const isViolet = i % 3 === 0;
      p30Colors[i * 3] = isViolet ? 0.65 : 0.25;
      p30Colors[i * 3 + 1] = isViolet ? 0.35 : 0.75;
      p30Colors[i * 3 + 2] = 0.98;
    }

    const p30Geo = new THREE.BufferGeometry();
    p30Geo.setAttribute('position', new THREE.BufferAttribute(p30CurrentPos, 3));
    p30Geo.setAttribute('color', new THREE.BufferAttribute(p30Colors, 3));

    const p30Mat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const p30Points = new THREE.Points(p30Geo, p30Mat);
    editionGroup.add(p30Points);

    // ==========================================
    // SECTION 3: TECHFEST UNIVERSE (ORBITAL SYSTEM)
    // ==========================================
    const universeGroup = new THREE.Group();
    universeGroup.position.set(0, -70, 0);
    scene.add(universeGroup);

    // Center Core: Techfest planetary sphere
    const tfCoreGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const tfCoreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4
    });
    const tfCore = new THREE.Mesh(tfCoreGeo, tfCoreMat);
    universeGroup.add(tfCore);

    // Concentric orbital path rings
    const orbitRadii = [6.5, 9.5, 12.5, 15.5];
    const orbitLines: THREE.Line[] = [];
    orbitRadii.forEach((rad) => {
      const circleGeo = new THREE.BufferGeometry();
      const pts: THREE.Vector3[] = [];
      const segments = 100;
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * rad, 0, Math.sin(theta) * rad));
      }
      circleGeo.setFromPoints(pts);
      const circleMat = new THREE.LineBasicMaterial({ color: 0x1e293b, transparent: true, opacity: 0.6 });
      const circle = new THREE.Line(circleGeo, circleMat);
      circle.rotation.x = Math.PI * 0.25;
      circle.rotation.y = Math.PI * 0.1;
      universeGroup.add(circle);
      orbitLines.push(circle);
    });

    // Domain 3D Satellite representations
    const domainObjects: {
      mesh: THREE.Group;
      domain: TechDomain;
      orbitRadius: number;
      orbitSpeed: number;
      orbitAngle: number;
      baseScale: number;
    }[] = [];

    const domainInteractiveMeshes: THREE.Object3D[] = [];

    TECH_DOMAINS.forEach((domain, idx) => {
      const dGroup = new THREE.Group();
      const orbitRad = 6.5 + (idx % 4) * 3.0;
      const startAngle = (idx / TECH_DOMAINS.length) * Math.PI * 2;

      // Unique geometry for each domain
      if (domain.id === 'ai') {
        // Neural sphere with synapse points
        const aiGeo = new THREE.SphereGeometry(0.7, 16, 16);
        const aiMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, wireframe: true });
        const aiMesh = new THREE.Mesh(aiGeo, aiMat);
        dGroup.add(aiMesh);
      } else if (domain.id === 'robotics') {
        // Robotic mechanical joint
        const jointGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 12);
        const jointMat = new THREE.MeshStandardMaterial({ color: 0x818cf8, metalness: 0.9, roughness: 0.2 });
        const jointMesh = new THREE.Mesh(jointGeo, jointMat);
        const ringArm = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.08, 8, 24), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        dGroup.add(jointMesh, ringArm);
      } else if (domain.id === 'drones') {
        // Miniature UAV frame
        const arm1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.08), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
        const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.6), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
        dGroup.add(arm1, arm2);
        // 4 rotor discs
        const rotorGeo = new THREE.CircleGeometry(0.3, 16);
        const rotorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
        const offsets = [[0.8, 0.8], [-0.8, 0.8], [0.8, -0.8], [-0.8, -0.8]];
        offsets.forEach(([ox, oz]) => {
          const rotor = new THREE.Mesh(rotorGeo, rotorMat);
          rotor.rotation.x = Math.PI / 2;
          rotor.position.set(ox, 0.1, oz);
          dGroup.add(rotor);
        });
      } else if (domain.id === 'space') {
        // Satellite with solar wings
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.8), new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.8 }));
        const solarL = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.02, 0.5), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        solarL.position.x = 0.9;
        const solarR = solarL.clone();
        solarR.position.x = -0.9;
        dGroup.add(body, solarL, solarR);
      } else if (domain.id === 'coding') {
        // Floating code cube
        const cubeGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        const cubeMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, wireframe: true });
        const core = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        dGroup.add(new THREE.Mesh(cubeGeo, cubeMat), core);
      } else if (domain.id === 'engineering') {
        // Mechanical gear ring
        const gearGeo = new THREE.TorusGeometry(0.7, 0.2, 8, 16);
        const gearMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, metalness: 0.8 });
        dGroup.add(new THREE.Mesh(gearGeo, gearMat));
      } else if (domain.id === 'science') {
        // Quantum orbital atom
        const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.03, 8, 32), new THREE.MeshBasicMaterial({ color: 0xa855f7 }));
        const ring2 = ring1.clone();
        ring2.rotation.x = Math.PI / 3;
        dGroup.add(nucleus, ring1, ring2);
      } else {
        // Innovation: energy core
        const oct = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), new THREE.MeshStandardMaterial({ color: 0xc084fc, metalness: 0.6 }));
        dGroup.add(oct);
      }

      // Invisible hit sphere for raycasting ease
      const hitSphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitSphere.userData = { domainId: domain.id, type: 'domain' };
      dGroup.add(hitSphere);
      domainInteractiveMeshes.push(hitSphere);

      universeGroup.add(dGroup);
      domainObjects.push({
        mesh: dGroup,
        domain,
        orbitRadius: orbitRad,
        orbitSpeed: 0.25 + (idx % 3) * 0.1,
        orbitAngle: startAngle,
        baseScale: 1.0
      });
    });

    // ==========================================
    // SECTION 4: COMPETITIONS ARENA
    // ==========================================
    const compGroup = new THREE.Group();
    compGroup.position.set(0, -105, 0);
    scene.add(compGroup);

    // Floating 3D Challenge Modules
    const compInteractiveMeshes: THREE.Object3D[] = [];
    const compModules: { mesh: THREE.Group; comp: CompetitionItem; basePos: THREE.Vector3 }[] = [];

    TECHFEST_COMPETITIONS.slice(0, 8).forEach((comp, idx) => {
      const cGroup = new THREE.Group();
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const x = (col - 1.5) * 5.2;
      const y = (0.5 - row) * 4.6;
      const z = (idx % 2 === 0 ? 1 : -1) * 1.5;
      const basePos = new THREE.Vector3(x, y, z);
      cGroup.position.copy(basePos);

      // Faceted obsidian & glass prism module
      const moduleGeo = new THREE.BoxGeometry(3.6, 2.2, 0.5);
      const moduleMat = new THREE.MeshStandardMaterial({
        color: 0x090d16,
        metalness: 0.85,
        roughness: 0.25,
        emissive: 0x0f172a
      });
      const moduleMesh = new THREE.Mesh(moduleGeo, moduleMat);

      // Glowing framing border
      const edgeGeo = new THREE.EdgesGeometry(moduleGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: comp.category === 'DRONES' ? 0x38bdf8 : comp.category === 'ROBOTICS' ? 0x818cf8 : 0x06b6d4,
        transparent: true,
        opacity: 0.75
      });
      const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
      cGroup.add(moduleMesh, edgeLines);

      // Small 3D accent glyph inside the module
      const accentGeo = new THREE.TetrahedronGeometry(0.4, 0);
      const accentMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
      const accentMesh = new THREE.Mesh(accentGeo, accentMat);
      accentMesh.position.set(-1.2, 0.5, 0.35);
      cGroup.add(accentMesh);

      moduleMesh.userData = { compId: comp.id, type: 'competition' };
      compInteractiveMeshes.push(moduleMesh);

      compGroup.add(cGroup);
      compModules.push({ mesh: cGroup, comp, basePos });
    });

    // ==========================================
    // SECTION 5: ROBOTICS ZONE (ARENA & ROVER)
    // ==========================================
    const roboticsGroup = new THREE.Group();
    roboticsGroup.position.set(0, -140, 0);
    scene.add(roboticsGroup);

    // Industrial obstacle course: ramps, bridges, moving platforms
    const arenaFloor = new THREE.GridHelper(30, 20, 0x38bdf8, 0x1e293b);
    arenaFloor.position.y = -3;
    roboticsGroup.add(arenaFloor);

    // Elevated bridge
    const bridgeGeo = new THREE.BoxGeometry(14, 0.4, 4);
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.8, roughness: 0.3 });
    const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
    bridge.position.set(0, -0.5, -2);
    roboticsGroup.add(bridge);

    // Slanted access ramp
    const rampGeo = new THREE.BoxGeometry(6, 0.3, 3);
    const ramp = new THREE.Mesh(rampGeo, bridgeMat);
    ramp.position.set(-8, -1.8, -2);
    ramp.rotation.z = Math.PI * 0.12;
    roboticsGroup.add(ramp);

    // Rotating mechanical obstacle / hazard rotor
    const hazardGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16);
    const hazardArmGeo = new THREE.BoxGeometry(4.5, 0.2, 0.4);
    const hazardArmMat = new THREE.MeshStandardMaterial({ color: 0x818cf8, metalness: 0.8 });
    const hazardHub = new THREE.Mesh(hazardGeo, hazardArmMat);
    const hazardBar = new THREE.Mesh(hazardArmGeo, hazardArmMat);
    const hazardSpinner = new THREE.Group();
    hazardSpinner.position.set(2, 0, -2);
    hazardSpinner.add(hazardHub, hazardBar);
    roboticsGroup.add(hazardSpinner);

    // Futuristic Rover Model
    const roverGroup = new THREE.Group();
    roverGroup.position.set(-2, -0.1, -2);

    // Chassis
    const chassisGeo = new THREE.BoxGeometry(2.4, 0.7, 1.6);
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    roverGroup.add(chassis);

    // Treads / wheels
    const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 });
    const wheelPositions = [
      [0.9, -0.4, 0.9], [-0.9, -0.4, 0.9],
      [0.9, -0.4, -0.9], [-0.9, -0.4, -0.9]
    ];
    wheelPositions.forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, wy, wz);
      roverGroup.add(wheel);
    });

    // Articulated robotic arm on top
    const armBase = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.3, 12), chassisMat);
    armBase.position.set(0.6, 0.45, 0);
    const armSegment1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.9, 0.15), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    armSegment1.position.set(0.6, 0.9, 0);
    armSegment1.rotation.z = -Math.PI * 0.18;
    const armSensor = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
    armSensor.position.set(0.9, 1.3, 0);
    roverGroup.add(armBase, armSegment1, armSensor);

    roboticsGroup.add(roverGroup);

    // ==========================================
    // SECTION 6: AI NEURAL NETWORK
    // ==========================================
    const aiGroup = new THREE.Group();
    aiGroup.position.set(0, -175, 0);
    scene.add(aiGroup);

    // Neural nodes
    const nodeCount = 120;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const nodeCluster = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < nodeCount; i++) {
      const px = (Math.random() - 0.5) * 22;
      const py = (Math.random() - 0.5) * 16;
      const pz = (Math.random() - 0.5) * 14;
      const pos = new THREE.Vector3(px, py, pz);
      nodePositions.push(pos);
      dummy.position.copy(pos);
      dummy.updateMatrix();
      nodeCluster.setMatrixAt(i, dummy.matrix);
    }
    nodeCluster.instanceMatrix.needsUpdate = true;
    aiGroup.add(nodeCluster);

    // Neural Synapse connections
    const synapseLinesGeo = new THREE.BufferGeometry();
    const synapseLinePoints: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 4.2) {
          synapseLinePoints.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }
    synapseLinesGeo.setAttribute('position', new THREE.Float32BufferAttribute(synapseLinePoints, 3));
    const synapseLinesMat = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.35
    });
    const synapseMesh = new THREE.LineSegments(synapseLinesGeo, synapseLinesMat);
    aiGroup.add(synapseMesh);

    // Core AI Nexus (High-density sphere)
    const nexusMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.8, 2),
      new THREE.MeshStandardMaterial({ color: 0x0369a1, wireframe: true })
    );
    aiGroup.add(nexusMesh);

    // ==========================================
    // SECTION 7: DRONES & AERIAL MOBILITY
    // ==========================================
    const droneGroup = new THREE.Group();
    droneGroup.position.set(0, -210, 0);
    scene.add(droneGroup);

    // Sky grid & altitude contours
    const skyGrid = new THREE.GridHelper(50, 25, 0x06b6d4, 0x0f172a);
    skyGrid.position.y = -8;
    droneGroup.add(skyGrid);

    // Hero Drone (UAV-X flagship)
    const heroDrone = new THREE.Group();
    heroDrone.position.set(0, 0, 2);

    const uavFuselage = new THREE.Mesh(
      new THREE.ConeGeometry(0.7, 2.2, 4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95, roughness: 0.15 })
    );
    uavFuselage.rotation.x = -Math.PI / 2;
    heroDrone.add(uavFuselage);

    const uavWings = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.06, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 })
    );
    uavWings.position.set(0, 0, 0.2);
    heroDrone.add(uavWings);

    // Drone light beacons
    const beaconLeft = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    beaconLeft.position.set(-2.1, 0, 0.2);
    const beaconRight = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshBasicMaterial({ color: 0xa855f7 }));
    beaconRight.position.set(2.1, 0, 0.2);
    heroDrone.add(beaconLeft, beaconRight);

    droneGroup.add(heroDrone);

    // Escort Swarm Drones (6 smaller drones flying in formation)
    const swarmDrones: { mesh: THREE.Group; phase: number; radius: number }[] = [];
    for (let s = 0; s < 6; s++) {
      const sDrone = new THREE.Group();
      const sBody = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true }));
      sDrone.add(sBody);
      droneGroup.add(sDrone);
      swarmDrones.push({ mesh: sDrone, phase: (s / 6) * Math.PI * 2, radius: 4.5 + (s % 2) * 2.5 });
    }

    // ==========================================
    // SECTION 8: WORKSHOP LABORATORY WORKSTATION
    // ==========================================
    const workshopGroup = new THREE.Group();
    workshopGroup.position.set(0, -245, 0);
    scene.add(workshopGroup);

    // Holographic projection table
    const tableBase = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 4.0, 0.4, 32), new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.9 }));
    tableBase.position.y = -2.5;
    workshopGroup.add(tableBase);

    // Hologram emitter rings
    const holoRing1 = new THREE.Mesh(new THREE.RingGeometry(2.0, 2.2, 32), new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.7 }));
    holoRing1.rotation.x = Math.PI / 2;
    holoRing1.position.y = -2.25;
    const holoRing2 = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.35, 32), new THREE.MeshBasicMaterial({ color: 0x818cf8, side: THREE.DoubleSide, transparent: true, opacity: 0.6 }));
    holoRing2.rotation.x = Math.PI / 2;
    holoRing2.position.y = -2.23;
    workshopGroup.add(holoRing1, holoRing2);

    // Floating 3D holographic projection model (revolving torus knot & DNA helix data)
    const holoObject = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.3, 0.35, 64, 16, 2, 3),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.75 })
    );
    holoObject.position.y = 0.5;
    workshopGroup.add(holoObject);

    // ==========================================
    // SECTION 9: PEOPLE & NETWORK SILHOUETTE FIELD
    // ==========================================
    const peopleGroup = new THREE.Group();
    peopleGroup.position.set(0, -280, 0);
    scene.add(peopleGroup);

    // 2500 crowd silhouette particles forming humanoid clusters + global network filaments
    const crowdParticleCount = 2000;
    const crowdGeo = new THREE.BufferGeometry();
    const crowdPositions = new Float32Array(crowdParticleCount * 3);
    const crowdColors = new Float32Array(crowdParticleCount * 3);

    for (let i = 0; i < crowdParticleCount; i++) {
      // Create silhouettes clustered around 5 focal human shapes across a digital map
      const cluster = i % 5;
      const clusterCenters = [
        [-8, 0, 0], [-4, 1.2, -2], [0, -0.5, 1], [4, 1.0, -1], [8, -0.2, 0]
      ];
      const cc = clusterCenters[cluster];

      // Humanoid distribution: head (sphere), torso (cylinder), limbs (lines)
      const part = Math.random();
      let dx = 0, dy = 0, dz = 0;
      if (part < 0.25) {
        // Head
        dx = (Math.random() - 0.5) * 0.6;
        dy = 2.4 + (Math.random() - 0.5) * 0.6;
        dz = (Math.random() - 0.5) * 0.6;
      } else if (part < 0.7) {
        // Torso
        dx = (Math.random() - 0.5) * 1.0;
        dy = 0.8 + (Math.random() - 0.5) * 1.8;
        dz = (Math.random() - 0.5) * 0.6;
      } else {
        // Base / limbs / ground dispersion
        dx = (Math.random() - 0.5) * 1.6;
        dy = -1.2 + (Math.random() - 0.5) * 1.4;
        dz = (Math.random() - 0.5) * 1.0;
      }

      crowdPositions[i * 3] = cc[0] + dx;
      crowdPositions[i * 3 + 1] = cc[1] + dy;
      crowdPositions[i * 3 + 2] = cc[2] + dz;

      const isHighlight = Math.random() > 0.7;
      crowdColors[i * 3] = isHighlight ? 0.3 : 0.85;
      crowdColors[i * 3 + 1] = isHighlight ? 0.75 : 0.9;
      crowdColors[i * 3 + 2] = 1.0;
    }

    crowdGeo.setAttribute('position', new THREE.BufferAttribute(crowdPositions, 3));
    crowdGeo.setAttribute('color', new THREE.BufferAttribute(crowdColors, 3));
    const crowdMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const crowdPoints = new THREE.Points(crowdGeo, crowdMat);
    peopleGroup.add(crowdPoints);

    // ==========================================
    // SECTION 10: IIT BOMBAY FUTURISTIC CAMPUS
    // ==========================================
    const campusGroup = new THREE.Group();
    campusGroup.position.set(0, -315, 0);
    scene.add(campusGroup);

    // Powai Lake reflection plane (dark cyber water)
    const lakeGeo = new THREE.PlaneGeometry(50, 40);
    const lakeMat = new THREE.MeshStandardMaterial({
      color: 0x020617,
      metalness: 0.95,
      roughness: 0.1
    });
    const lake = new THREE.Mesh(lakeGeo, lakeMat);
    lake.rotation.x = -Math.PI / 2;
    lake.position.y = -3.5;
    campusGroup.add(lake);

    // Abstract Futuristic Main Building Architectural Massing
    const bldgMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      metalness: 0.8,
      roughness: 0.25,
      wireframe: false
    });
    const bldgEdgeMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });

    // Main canopy pavilion
    const mainTowerGeo = new THREE.BoxGeometry(8, 4.5, 3.5);
    const mainTower = new THREE.Mesh(mainTowerGeo, bldgMat);
    mainTower.position.set(0, -1.2, -6);
    const towerEdge = new THREE.LineSegments(new THREE.EdgesGeometry(mainTowerGeo), bldgEdgeMat);
    mainTower.add(towerEdge);

    // Wings
    const wingLGeo = new THREE.BoxGeometry(6, 2.5, 3);
    const wingL = new THREE.Mesh(wingLGeo, bldgMat);
    wingL.position.set(-7, -2.2, -6);
    wingL.add(new THREE.LineSegments(new THREE.EdgesGeometry(wingLGeo), bldgEdgeMat));

    const wingR = wingL.clone();
    wingR.position.x = 7;

    campusGroup.add(mainTower, wingL, wingR);

    // Techfest Portal suspended over IIT Bombay campus
    const campusPortal = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.08, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 })
    );
    campusPortal.position.set(0, 3.2, -6);
    campusGroup.add(campusPortal);

    // ==========================================
    // SECTION 11: FINAL COLLAPSE & DIGITAL CORE
    // ==========================================
    const finalGroup = new THREE.Group();
    finalGroup.position.set(0, -350, 0);
    scene.add(finalGroup);

    // Central Radiant Singularity Core
    const singularityGeo = new THREE.IcosahedronGeometry(2.8, 3);
    const singularityMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.95
    });
    const singularity = new THREE.Mesh(singularityGeo, singularityMat);
    finalGroup.add(singularity);

    // Orbiting convergence particle vortex
    const vortexCount = 1500;
    const vortexGeo = new THREE.BufferGeometry();
    const vortexPos = new Float32Array(vortexCount * 3);
    const vortexColors = new Float32Array(vortexCount * 3);
    for (let i = 0; i < vortexCount; i++) {
      const rad = 3.5 + Math.random() * 12;
      const ang = Math.random() * Math.PI * 2;
      vortexPos[i * 3] = Math.cos(ang) * rad;
      vortexPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      vortexPos[i * 3 + 2] = Math.sin(ang) * rad;

      vortexColors[i * 3] = 0.2 + Math.random() * 0.5;
      vortexColors[i * 3 + 1] = 0.7;
      vortexColors[i * 3 + 2] = 1.0;
    }
    vortexGeo.setAttribute('position', new THREE.BufferAttribute(vortexPos, 3));
    vortexGeo.setAttribute('color', new THREE.BufferAttribute(vortexColors, 3));
    const vortexMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const vortexPoints = new THREE.Points(vortexGeo, vortexMat);
    finalGroup.add(vortexPoints);

    // Concentric gyro rings around singularity
    const gyroRing1 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.05, 16, 64), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    const gyroRing2 = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.05, 16, 64), new THREE.MeshBasicMaterial({ color: 0xa855f7 }));
    const gyroRing3 = new THREE.Mesh(new THREE.TorusGeometry(6.6, 0.05, 16, 64), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
    finalGroup.add(gyroRing1, gyroRing2, gyroRing3);

    // ==========================================
    // INTERACTION & MOUSE LISTENER
    // ==========================================
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.targetMouseX = normX;
      stateRef.current.targetMouseY = normY;

      // Handle dragging for free-look rotation when allowed
      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.dragStartX;
        const deltaY = e.clientY - stateRef.current.dragStartY;
        stateRef.current.targetUserRotY += deltaX * 0.005;
        stateRef.current.targetUserRotX += deltaY * 0.005;
        stateRef.current.dragStartX = e.clientX;
        stateRef.current.dragStartY = e.clientY;
      }

      // Raycasting for interactive domain & competition picking
      mouseVector.x = normX;
      mouseVector.y = normY;
      raycaster.setFromCamera(mouseVector, camera);

      // 1. Check Domains in Universe section
      const domainIntersects = raycaster.intersectObjects(domainInteractiveMeshes, true);
      if (domainIntersects.length > 0) {
        const hit = domainIntersects[0].object;
        const domId = hit.userData.domainId;
        if (domId && domId !== stateRef.current.hoveredDomainId) {
          stateRef.current.hoveredDomainId = domId;
          const matched = TECH_DOMAINS.find((d) => d.id === domId) || null;
          onHoverDomain(matched);
          soundEngine.playHover();
        }
      } else {
        if (stateRef.current.hoveredDomainId) {
          stateRef.current.hoveredDomainId = null;
          onHoverDomain(null);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX;
      stateRef.current.dragStartY = e.clientY;
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleClick = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseVector.x = normX;
      mouseVector.y = normY;
      raycaster.setFromCamera(mouseVector, camera);

      // Check Domains click
      const domainHits = raycaster.intersectObjects(domainInteractiveMeshes, true);
      if (domainHits.length > 0) {
        const dId = domainHits[0].object.userData.domainId;
        const matched = TECH_DOMAINS.find((d) => d.id === dId) || null;
        onSelectDomain(matched);
        soundEngine.playClick(640);
        return;
      }

      // Check Competitions click
      const compHits = raycaster.intersectObjects(compInteractiveMeshes, true);
      if (compHits.length > 0) {
        const cId = compHits[0].object.userData.compId;
        const matched = TECHFEST_COMPETITIONS.find((c) => c.id === cId) || null;
        onSelectCompetition(matched);
        soundEngine.playClick(720);
        return;
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // ==========================================
    // ANIMATION & SCROLL PROGRESSION LOOP
    // ==========================================
    let animId: number;
    let clock = new THREE.Clock();

    const sectionYOffsets = [
      0,     // 0: Portal
      -35,   // 1: 30th Edition
      -70,   // 2: Universe
      -105,  // 3: Competitions
      -140,  // 4: Robotics
      -175,  // 5: AI
      -210,  // 6: Drones
      -245,  // 7: Workshops
      -280,  // 8: People
      -315,  // 9: IIT Bombay
      -350   // 10: Final Core
    ];

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      const s = stateRef.current;
      s.mouseX += (s.targetMouseX - s.mouseX) * 0.08;
      s.mouseY += (s.targetMouseY - s.mouseY) * 0.08;
      s.userRotX += (s.targetUserRotX - s.userRotX) * 0.1;
      s.userRotY += (s.targetUserRotY - s.userRotY) * 0.1;

      // Determine continuous camera target Y along the 11 sections
      const totalSections = 10; // indices 0 through 10
      const currentProgressClamped = Math.max(0, Math.min(1, s.scrollProgress));
      const sectionFloat = currentProgressClamped * totalSections;
      const lowerIndex = Math.min(Math.floor(sectionFloat), 9);
      const frac = sectionFloat - lowerIndex;

      const targetY = sectionYOffsets[lowerIndex] + (sectionYOffsets[lowerIndex + 1] - sectionYOffsets[lowerIndex]) * frac;

      // Smooth camera interpolation
      camera.position.y += (targetY - camera.position.y) * 0.08;

      // Subtle mouse parallax
      camera.position.x += (s.mouseX * 1.5 - camera.position.x) * 0.05;
      const baseZ = 16 - frac * 2;
      camera.position.z += (baseZ - camera.position.z) * 0.05;

      // Allow slight free-look rotation when dragging in 3D zones
      camera.rotation.y = -s.mouseX * 0.08 + s.userRotY;
      camera.rotation.x = s.mouseY * 0.06 - s.userRotX;

      // Animate background dust particles
      bgDust.rotation.y = elapsedTime * 0.02;

      // --- 1. PORTAL ANIMATION ---
      coreWire.rotation.x = elapsedTime * 0.4;
      coreWire.rotation.y = elapsedTime * 0.6;
      innerCore.rotation.x = -elapsedTime * 0.5;
      portalRings.forEach((ring, idx) => {
        ring.rotation.z = (idx % 2 === 0 ? 1 : -1) * elapsedTime * (0.2 + idx * 0.08);
      });

      // --- 2. 30TH EDITION PARTICLE MORPH ---
      // When around section 1 (frac around 0.5 to 1.5), assemble into 30
      const p30Progress = Math.max(0, Math.min(1, (sectionFloat - 0.3) * 1.2));
      const posAttr = p30Geo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particle30Count; i++) {
        const chaos = p30ChaosPos[i];
        const target = p30TargetPos[i];
        // Morph lerp
        const px = chaos.x + (target.x - chaos.x) * p30Progress;
        const py = chaos.y + (target.y - chaos.y) * p30Progress;
        const pz = chaos.z + (target.z - chaos.z) * p30Progress;

        // Add subtle wave pulse
        posArray[i * 3] = px + Math.sin(elapsedTime * 2 + i) * 0.06;
        posArray[i * 3 + 1] = py + Math.cos(elapsedTime * 2 + i) * 0.06;
        posArray[i * 3 + 2] = pz;
      }
      posAttr.needsUpdate = true;
      p30Points.rotation.y = elapsedTime * 0.08;

      // --- 3. UNIVERSE ORBITING SYSTEM ---
      tfCore.rotation.y = elapsedTime * 0.3;
      domainObjects.forEach((d) => {
        d.orbitAngle += 0.008 * d.orbitSpeed;
        const isHovered = s.hoveredDomainId === d.domain.id || s.selectedDomainId === d.domain.id;

        // Distance from center: if hovered, bring closer to front
        const currentRad = isHovered ? d.orbitRadius * 0.75 : d.orbitRadius;
        const ox = Math.cos(d.orbitAngle) * currentRad;
        const oz = Math.sin(d.orbitAngle) * currentRad;
        const oy = Math.sin(d.orbitAngle * 2) * 1.2;

        d.mesh.position.set(ox, oy, oz);
        d.mesh.rotation.y += 0.02;

        // Hover scale transition
        const targetScale = isHovered ? 1.6 : 1.0;
        d.baseScale += (targetScale - d.baseScale) * 0.1;
        d.mesh.scale.set(d.baseScale, d.baseScale, d.baseScale);
      });

      // --- 4. COMPETITIONS FLOATING MODULES ---
      compModules.forEach((mod, idx) => {
        const isSelected = s.selectedCompetitionId === mod.comp.id;
        const floatOffset = Math.sin(elapsedTime * 1.5 + idx) * 0.2;
        if (isSelected) {
          mod.mesh.position.set(0, 0, 4);
          mod.mesh.scale.lerp(new THREE.Vector3(1.25, 1.25, 1.25), 0.1);
        } else {
          mod.mesh.position.set(mod.basePos.x, mod.basePos.y + floatOffset, mod.basePos.z);
          mod.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
        mod.mesh.rotation.y = Math.sin(elapsedTime * 0.5 + idx) * 0.08;
      });

      // --- 5. ROBOTICS OBSTACLES & ROVER ---
      hazardSpinner.rotation.y = elapsedTime * 1.8;
      roverGroup.position.x = -2 + Math.sin(elapsedTime * 0.8) * 2.2;
      armSegment1.rotation.z = -Math.PI * 0.18 + Math.sin(elapsedTime * 1.2) * 0.15;

      // --- 6. AI NEURAL PULSE ---
      aiGroup.rotation.y = elapsedTime * 0.06;
      nexusMesh.rotation.x = elapsedTime * 0.2;
      nexusMesh.rotation.y = elapsedTime * 0.3;

      // --- 7. DRONES FLIGHT DYNAMICS ---
      heroDrone.position.x = s.mouseX * 3.5;
      heroDrone.position.y = s.mouseY * 1.8;
      heroDrone.rotation.z = -s.mouseX * 0.4;
      heroDrone.rotation.x = s.mouseY * 0.25;

      swarmDrones.forEach((drone, idx) => {
        const ang = elapsedTime * 1.2 + drone.phase;
        drone.mesh.position.set(
          Math.cos(ang) * drone.radius,
          Math.sin(ang * 1.5) * 1.4,
          Math.sin(ang) * drone.radius - 2
        );
        drone.mesh.rotation.y += 0.04;
      });

      // --- 8. WORKSHOP LAB HOLOGRAM ---
      holoRing1.rotation.z = elapsedTime * 0.8;
      holoRing2.rotation.z = -elapsedTime * 1.2;
      holoObject.rotation.x = elapsedTime * 0.4;
      holoObject.rotation.y = elapsedTime * 0.6;

      // --- 9. PEOPLE NETWORK SILHOUETTE ---
      crowdPoints.rotation.y = Math.sin(elapsedTime * 0.2) * 0.12;

      // --- 10. CAMPUS TECHFEST PORTAL ---
      campusPortal.rotation.z = elapsedTime * 0.5;

      // --- 11. FINAL SINGULARITY CORE ---
      singularity.rotation.y = elapsedTime * 0.7;
      singularity.rotation.x = elapsedTime * 0.4;
      gyroRing1.rotation.x = elapsedTime * 1.0;
      gyroRing2.rotation.y = elapsedTime * 1.2;
      gyroRing3.rotation.z = elapsedTime * 0.8;
      vortexPoints.rotation.y = -elapsedTime * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      // Clean up geometries and materials to avoid memory leaks
      renderer.dispose();
    };
  }, [onHoverDomain, onSelectDomain, onSelectCompetition]);

  return (
    <canvas
      ref={canvasRef}
      id="simulation-webgl-canvas"
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
    />
  );
};
