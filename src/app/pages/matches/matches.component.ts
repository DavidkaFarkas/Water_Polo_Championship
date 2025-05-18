import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() upcomingMatches: any[] = []; // Szülő komponens adja át
  @Input() pastMatches: any[] = [];     // Szülő komponens adja át
  @Output() matchClick = new EventEmitter<any>(); // Esemény a kattintásra

  onMatchClick(match: any) {
    this.matchClick.emit(match); // Elküldjük a szülőnek a mérkőzés adatát
  }
}
