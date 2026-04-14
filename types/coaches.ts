// export interface CoachProfile {
//     id: string; // UUID
//     license: string;
//     experience_years: number;
//     rating: number | null;
//     speciality: string;
//   }

export interface CoachProfile {
    id: number;
    name: string;
    role: string;
    license: string;
    bio: string;
  
    stats: {
      experience: number; // years
      teams: number;
      win_rate: number; // percentage
    };
  
    teams: string[];
  
    rating: number;
  
    skills: Skill[];
  
    // upcoming: Event[];
  }
  
  interface Skill {
    name: string;
    pct: number; // percentage
  }
  
  interface Event {
    date: string;
    title: string;
    time: string;
    venue: string;
  }