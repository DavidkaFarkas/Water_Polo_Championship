import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TeamStandingsPipe } from '../../shared/pipes/team-standings.pipe';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TeamStandingsPipe], 
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'] 
})
export class TeamsComponent {
  teams = [
    { name: 'BVSC', city: 'Budapest', players: 13, points: 25 },
    { name: 'Debreceni VSE', city: 'Debrecen', players: 12, points: 30 },
    { name: 'Szeged VSE', city: 'Szeged', players: 14, points: 20 },
  ];
}