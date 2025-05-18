import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "waterpolo-b2e74", appId: "1:59290695722:web:0fe55770271b814d64ab53", storageBucket: "waterpolo-b2e74.firebasestorage.app", apiKey: "AIzaSyBwFFggKrc2QeXhs_GdYEEpJ_yeu-kNnsA", authDomain: "waterpolo-b2e74.firebaseapp.com", messagingSenderId: "59290695722" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};