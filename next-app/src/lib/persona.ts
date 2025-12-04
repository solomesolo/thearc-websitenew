// Persona/Profile Types
export type PersonaType = 'women' | 'traveler' | 'rebuilder';

export interface PersonaConfig {
  id: PersonaType;
  name: string;
  title: string;
  description: string;
  route: string;
  questionnaireRoute: string;
  dashboardRoute: string;
}

export const PERSONAS: Record<PersonaType, PersonaConfig> = {
  women: {
    id: 'women',
    name: 'Women in Menopause',
    title: 'Women in Menopause',
    description: 'A clinically guided view of what your body is signalling, plus personalised routines and screenings designed specifically for women in midlife transition.',
    route: '/women',
    questionnaireRoute: '/questionnaire/women',
    dashboardRoute: '/dashboard/women',
  },
  traveler: {
    id: 'traveler',
    name: 'Global Movers',
    title: 'Digital Nomads & Global Movers',
    description: 'A unified health identity, clear risk picture, and a portable roadmap that keeps your biology stable during major life transitions.',
    route: '/traveler',
    questionnaireRoute: '/questionnaire/traveler',
    dashboardRoute: '/dashboard/traveler',
  },
  rebuilder: {
    id: 'rebuilder',
    name: 'Health Rebuilders',
    title: 'Health Anxious & Rebuilders',
    description: 'Clinically informed clarity and a personalised path to restore stability, strength, and resilience.',
    route: '/rebuilder',
    questionnaireRoute: '/questionnaire/rebuilder',
    dashboardRoute: '/dashboard/rebuilder',
  },
};

// Get persona from URL or localStorage
export function getPersonaFromRoute(pathname: string): PersonaType | null {
  if (pathname.startsWith('/women') || pathname.includes('women')) {
    return 'women';
  }
  if (pathname.startsWith('/traveler') || pathname.includes('traveler')) {
    return 'traveler';
  }
  if (pathname.startsWith('/rebuilder') || pathname.includes('rebuilder')) {
    return 'rebuilder';
  }
  return null;
}

// Store persona in localStorage
export function setPersona(persona: PersonaType) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('selectedPersona', persona);
    localStorage.setItem('personaTimestamp', Date.now().toString());
  }
}

// Get stored persona
export function getStoredPersona(): PersonaType | null {
  if (typeof window !== 'undefined') {
    const persona = localStorage.getItem('selectedPersona') as PersonaType | null;
    if (persona && Object.keys(PERSONAS).includes(persona)) {
      return persona;
    }
  }
  return null;
}

// Clear persona (for testing or reset)
export function clearPersona() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('selectedPersona');
    localStorage.removeItem('personaTimestamp');
  }
}

