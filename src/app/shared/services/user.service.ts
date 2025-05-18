import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: User | null,
    tasks: Task[],
    stats: {
      total: number,
      completed: number,
      pending: number,
      completionRate: number
    }
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            tasks: [],
            stats: { total: 0, completed: 0, pending: 0, completionRate: 0 }
          });
        }

        return from(this.fetchUserWithTasks(authUser.uid));
      })
    );
  }

  private async fetchUserWithTasks(userId: string): Promise<{
    user: User | null,
    tasks: Task[],
    stats: {
      total: number,
      completed: number,
      pending: number,
      completionRate: number
    }
  }> {
    try {
      
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return {
          user: null,
          tasks: [],
          stats: { total: 0, completed: 0, pending: 0, completionRate: 0 }
        };
      }

      const userData = userSnapshot.data() as User;
      const user = { ...userData, id: userId };
      
      if (!user.tasks || user.tasks.length === 0) {
        return {
          user,
          tasks: [],
          stats: { total: 0, completed: 0, pending: 0, completionRate: 0 }
        };
      }

      
      const tasksCollection = collection(this.firestore, 'Tasks');
      const q = query(tasksCollection, where('id', 'in', user.tasks));
      const tasksSnapshot = await getDocs(q);
      
      const tasks: Task[] = [];
tasksSnapshot.forEach(doc => {
  const data = doc.data() as any;
  const idNumber = parseInt(doc.id, 10);
  if (!isNaN(idNumber)) {
    tasks.push({ ...data, id: idNumber } as Task);
  } else {
    console.warn('Érvénytelen szám formátum az ID-ban:', doc.id);
    
  }
});

      
      const total = tasks.length;
      const completed = tasks.filter(task => task.completed).length;
      const pending = total - completed;
      const completionRate = total > 0 ? (completed / total) * 100 : 0;

      return {
        user,
        tasks,
        stats: {
          total,
          completed,
          pending,
          completionRate
        }
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        tasks: [],
        stats: { total: 0, completed: 0, pending: 0, completionRate: 0 }
      };
    }
  }
  async updateUserProfile(user: User): Promise<void> {
    try {
      const userDocRef = doc(this.firestore, 'Users', user.id); 
      await updateDoc(userDocRef, {
        email: user.email,
        position: user.position 
      });
      console.log('A felhasználói profil sikeresen frissítve!');
    } catch (error) {
      console.error('Hiba a felhasználói profil frissítése során:', error);
      throw error; 
    }
  }

}