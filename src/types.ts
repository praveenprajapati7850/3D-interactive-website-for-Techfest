export type SimulationSectionId =
  | 'portal'
  | 'edition30'
  | 'universe'
  | 'competitions'
  | 'robotics'
  | 'ai'
  | 'drones'
  | 'workshops'
  | 'people'
  | 'iitbombay'
  | 'final';

export interface TechDomain {
  id: string;
  name: string;
  type: string;
  symbol: string;
  description: string;
  highlight: string;
  subfields: string[];
  color: string;
}

export interface CompetitionItem {
  id: string;
  name: string;
  category: 'ROBOTICS' | 'AI' | 'CODING' | 'DRONES' | 'INNOVATION' | 'ENGINEERING';
  tagline: string;
  shortDescription: string;
  status: string;
  track: string;
  details: string[];
}

export interface WorkshopItem {
  id: string;
  title: string;
  category: string;
  level: string;
  abstract: string;
  modules: string[];
}

export interface SimulationState {
  currentSection: SimulationSectionId;
  scrollProgress: number;
  sectionIndex: number;
  selectedCompetition: CompetitionItem | null;
  selectedDomain: TechDomain | null;
  audioActive: boolean;
  cameraFreeLook: boolean;
}
