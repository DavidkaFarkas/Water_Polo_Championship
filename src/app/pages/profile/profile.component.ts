import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule, 
    MatProgressBarModule,
    FormsModule,       
    ReactiveFormsModule  
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Profil adatainak tárolása
  profiles: {
    id: string;
    user_name: string;
    email: string;
    position: string;
    tasks: { total: number; completed: number; pending: number; };
  }[] = [];

  selectedIndex: number = 0;
  loggedInUser: User | null = null;
  profileForm: FormGroup; 
  editing: boolean = false; 

  
  positions: string[] = [
    'Center',
    'Driver',
    'Point',
    'Defender',
    'Goalkeeper'
  ];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder 
  ) {
    
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      position: [''] 
    });
  }

  
  ngOnInit(): void {
    this.authService.currentUser.pipe(
      switchMap(user => {
        if (user) {
          
          return this.userService.getUserProfile();
        } else {
          
          return of({
            user: null,
            tasks: [],
            stats: { total: 0, completed: 0, pending: 0, completionRate: 0 }
          });
        }
      })
    ).subscribe(({ user, tasks }) => {
      this.loggedInUser = user;
      if (user) {
        
        this.profiles = [
          {
            id: user.id,
            user_name: user.name.firstname + ' ' + user.name.lastname,
            email: user.email,
            position: user.position || 'N/A', 
            tasks: { total: 0, completed: 0, pending: 0 },
          }
        ];
        this.selectedIndex = 0;
        
        this.profileForm.patchValue({
          email: user.email,
          position: user.position || '' 
        });
        this.editing = false; 
      } else {
        this.profiles = [];
      }
    });
  }

  // Profil újratöltése 
  reload(index: number): void {
    this.selectedIndex = index;
  }

  // Nyomon követés 
  trackByIndex(index: number): number {
    return index;
  }

  
  calculateGoalEfficiency(): string {
    if (this.profiles.length > 0) {
      const player = this.profiles[this.selectedIndex];
      const efficiency = (player.tasks.completed / player.tasks.total) * 100;
      return efficiency.toFixed(2);
    }
    return '0.00';
  }

  // Szerkesztés gombra kattintás
  enableEditing(): void {
    this.editing = true;
  }

  // Mentés gombra kattintás
  saveChanges(): void {
    if (this.profileForm.valid && this.loggedInUser) {
      // Frissítjük a felhasználó adatait a form értékeivel
      const updatedUser = {
        ...this.loggedInUser,
        email: this.profileForm.value.email,
        position: this.profileForm.value.position
      };

      
      this.userService.updateUserProfile(updatedUser).then(() => {
        
        this.editing = false; 
        this.ngOnInit(); 
        console.log('Profil sikeresen frissítve!');
      }).catch(error => {
        console.error('Hiba a profil frissítése során:', error);
      });


    }
  }
}

