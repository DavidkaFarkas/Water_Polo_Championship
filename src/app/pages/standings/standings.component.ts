import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  imports: [CommonModule],
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent {
  teams = [
    {
      name: 'Vízilabda Csapat A',
      matches: 10,
      wins: 8,
      draws: 1,
      losses: 1,
      scored: 45,
      conceded: 30,
      goalDiff: 15,
      points: 25
    },
    {
      name: 'Vízilabda Csapat B',
      matches: 10,
      wins: 6,
      draws: 2,
      losses: 2,
      scored: 40,
      conceded: 35,
      goalDiff: 5,
      points: 20
    },
    {
      name: 'Vízilabda Csapat C',
      matches: 10,
      wins: 5,
      draws: 3,
      losses: 2,
      scored: 38,
      conceded: 30,
      goalDiff: 8,
      points: 18
    },
    {
      name: 'Vízilabda Csapat D',
      matches: 10,
      wins: 3,
      draws: 3,
      losses: 4,
      scored: 30,
      conceded: 40,
      goalDiff: -10,
      points: 12
    }
  ];
}
