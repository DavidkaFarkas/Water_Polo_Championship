import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match as MatchModel } from '../../shared/models/Match'; // Importálja a Match modellt
import { Team } from '../../shared/models/Team'; // Importálja a Team modellt, ha létezik

// Definiálja a Match interfészt a megadott modell alapján
export interface Match {
  id: number;
  homeTeam: Team; // Használja a Team interfészt
  awayTeam: Team; // Használja a Team interfészt
  date: Date;
  homeScore?: number;
  awayScore?: number;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private apiUrl = 'http://localhost:4200/matches'; 

  constructor(private http: HttpClient) {}

  
  getMatches(): Observable<MatchModel[]> {
    return this.http.get<MatchModel[]>(this.apiUrl);
  }

  
  getMatch(id: number): Observable<MatchModel> { 
    return this.http.get<MatchModel>(`${this.apiUrl}/${id}`);
  }

  
  createMatch(match: MatchModel): Observable<MatchModel> {
    return this.http.post<MatchModel>(this.apiUrl, match);
  }

  
  updateMatch(id: number, match: MatchModel): Observable<MatchModel> { 
    return this.http.put<MatchModel>(`${this.apiUrl}/${id}`, match);
  }

  // Mérkőzés törlése ID alapján
  deleteMatch(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
