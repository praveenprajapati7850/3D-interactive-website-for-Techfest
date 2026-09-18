import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Navigation } from './components/Navigation';
import { HeroPortal } from './components/HeroPortal';
import { Edition30 } from './components/Edition30';
import { TechfestUniverse } from './components/TechfestUniverse';
import { CompetitionArena } from './components/CompetitionArena';
import { RoboticsSection } from './components/RoboticsSection';
import { AISection } from './components/AISection';
import { DroneSection } from './components/DroneSection';
import { WorkshopSection } from './components/WorkshopSection';
import { PeopleNetwork } from './components/PeopleNetwork';
import { IITBombaySection } from './components/IITBombaySection';
import { FinalExperience } from './components/FinalExperience';
import { TechDomain, CompetitionItem } from './types';
import { soundEngine } from './utils/audio';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [hoveredDomain, setHoveredDomain] = useState<TechDomain | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<TechDomain | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<CompetitionItem | null>(null);
  const [audioActive, setAudioActive] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState(false);

  // Section references for precise jump scrolling
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll listener calculates normalized scroll progress (0.0 to 1.0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScrollHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalScrollHeight)) : 0;
      setScrollProgress(progress);

      // Map progress to section index 0 to 10
      const sIndex = Math.min(10, Math.floor(progress * 11));
      if (sIndex !== currentSectionIndex) {
        setCurrentSectionIndex(sIndex);
        soundEngine.setSectionModulation(sIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSectionIndex]);

  const jumpToSection = useCallback((index: number) => {
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = (index / 10) * totalScrollHeight;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }, []);

  const handleToggleAudio = () => {
    const isPlaying = soundEngine.toggle();
    setAudioActive(isPlaying);
    if (isPlaying) {
      soundEngine.playClick(880);
    }
  };

  const handleToggleInteractive = () => {
    setInteractiveMode((prev) => !prev);
    soundEngine.playClick(620);
  };

  return (
    <main className="relative bg-[#030712] text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background 3D WebGL Canvas */}
      <ThreeCanvas
        scrollProgress={scrollProgress}
        currentSectionIndex={currentSectionIndex}
        onHoverDomain={setHoveredDomain}
        onSelectDomain={setSelectedDomain}
        onSelectCompetition={setSelectedCompetition}
        selectedCompetition={selectedCompetition}
        selectedDomain={selectedDomain}
        interactiveMode={interactiveMode}
      />

      {/* Floating Minimal Navigation & Simulation Telemetry HUD */}
      <Navigation
        currentSectionIndex={currentSectionIndex}
        onJumpToSection={jumpToSection}
        audioActive={audioActive}
        onToggleAudio={handleToggleAudio}
        interactiveMode={interactiveMode}
        onToggleInteractive={handleToggleInteractive}
      />

      {/* 11 Continuous Cinematic Journey Sections */}
      <div className="relative z-10">
        {/* SECTION 1 — THE PORTAL */}
        <div ref={(el) => { sectionRefs.current[0] = el; }} id="sec-portal">
          <HeroPortal onEnterSimulation={() => jumpToSection(1)} />
        </div>

        {/* SECTION 2 — THE 30TH EDITION */}
        <div ref={(el) => { sectionRefs.current[1] = el; }} id="sec-edition30">
          <Edition30 />
        </div>

        {/* SECTION 3 — THE TECHFEST UNIVERSE */}
        <div ref={(el) => { sectionRefs.current[2] = el; }} id="sec-universe">
          <TechfestUniverse
            selectedDomain={selectedDomain}
            hoveredDomain={hoveredDomain}
            onSelectDomain={setSelectedDomain}
          />
        </div>

        {/* SECTION 4 — COMPETITIONS */}
        <div ref={(el) => { sectionRefs.current[3] = el; }} id="sec-competitions">
          <CompetitionArena
            selectedCompetition={selectedCompetition}
            onSelectCompetition={setSelectedCompetition}
          />
        </div>

        {/* SECTION 5 — ROBOTICS ZONE */}
        <div ref={(el) => { sectionRefs.current[4] = el; }} id="sec-robotics">
          <RoboticsSection
            interactiveMode={interactiveMode}
            onToggleInteractive={handleToggleInteractive}
          />
        </div>

        {/* SECTION 6 — AI + DIGITAL INTELLIGENCE */}
        <div ref={(el) => { sectionRefs.current[5] = el; }} id="sec-ai">
          <AISection />
        </div>

        {/* SECTION 7 — DRONES + FUTURE MOBILITY */}
        <div ref={(el) => { sectionRefs.current[6] = el; }} id="sec-drones">
          <DroneSection />
        </div>

        {/* SECTION 8 — WORKSHOPS + LEARNING */}
        <div ref={(el) => { sectionRefs.current[7] = el; }} id="sec-workshops">
          <WorkshopSection />
        </div>

        {/* SECTION 9 — THE PEOPLE */}
        <div ref={(el) => { sectionRefs.current[8] = el; }} id="sec-people">
          <PeopleNetwork />
        </div>

        {/* SECTION 10 — IIT BOMBAY */}
        <div ref={(el) => { sectionRefs.current[9] = el; }} id="sec-iitbombay">
          <IITBombaySection />
        </div>

        {/* SECTION 11 — FINAL EXPERIENCE */}
        <div ref={(el) => { sectionRefs.current[10] = el; }} id="sec-final">
          <FinalExperience
            onRestartSimulation={() => jumpToSection(0)}
            onExploreCompetitions={() => jumpToSection(3)}
          />
        </div>
      </div>
    </main>
  );
}
