import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Profilok adatainak tárolása
  profiles = [
    {
      id: '1',
      user_name: 'John Doe',
      user_url: 'https://example.com/johndoe',
      photo_url: 'https://example.com/photo.jpg',
      email: 'john.doe@example.com',
      avatar: 'JD',
      position: 'Goalkeeper',
      tasks: {
        total: 100, // összes mérkőzés
        completed: 75, // befejezett gólok
        pending: 5 // hátralévő mérkőzések
      }
    },
    {
      id: '2',
      user_name: 'Jane Smith',
      user_url: 'https://example.com/janesmith',
      photo_url: 'https://example.com/photo2.jpg',
      email: 'jane.smith@example.com',
      avatar: 'JS',
      position: 'Attacker',
      tasks: {
        total: 120,
        completed: 95,
        pending: 3
      }
    }
  ];

  selectedIndex: number = 0; // Kezdő index (alapértelmezett első profil)

  // A komponens inicializálása
  ngOnInit(): void {
    this.selectedIndex = 0; // alapértelmezett profil betöltése
  }

  // Profil újratöltése (választáskor)
  reload(index: number): void {
    this.selectedIndex = index;
  }

  // Nyomon követés (optimalizálás a ngFor-ban)
  trackByIndex(index: number): number {
    return index;
  }

  // Gólhatékonyság számítása (tasks alapú számítás)
  calculateGoalEfficiency(): string {
    const player = this.profiles[this.selectedIndex];
    const efficiency = (player.tasks.completed / player.tasks.total) * 100;
    return efficiency.toFixed(2); // Hatékonyság százalékban
  }
}

