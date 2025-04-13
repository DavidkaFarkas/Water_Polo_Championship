import { Team } from './Team'

export interface Match {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    date: Date;
    homeScore?: number;
    awayScore?: number;
    location: string;
  }
  