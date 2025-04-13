import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent {
  upcomingMatches = [
    {
      date: '2025. 05. 01. 18:00',
      home: 'BVSC',
      away: 'FTC-Telekom',
      location: 'Komjádi Uszoda'
    },
    {
      date: '2025. 05. 03. 20:00',
      home: 'OSC',
      away: 'Szolnok',
      location: 'Nyéki Imre Uszoda'
    }
  ];

  pastMatches = [
    {
      date: '2025. 04. 10. 17:30',
      home: 'Eger',
      away: 'Szeged',
      score: '8 - 9',
      location: 'Bitskey Aladár Uszoda'
    },
    {
      date: '2025. 04. 06. 19:00',
      home: 'Vasas',
      away: 'Honvéd',
      score: '7 - 7',
      location: 'Vasas Sportuszoda'
    }
  ];
}
