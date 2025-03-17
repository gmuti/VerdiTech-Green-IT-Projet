import { Component } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase-config';
import { initializeApp } from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';  // Importation de HttpClient

// Initialisation de Firebase
initializeApp(firebaseConfig);

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  token: string = '';  // Pour stocker le token

  constructor(private http: HttpClient) {}

  login() {
    const auth = getAuth();

    // Connexion avec email et mot de passe
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Récupérer le token
        userCredential.user?.getIdToken().then((token) => {
          this.token = token;
          console.log('Token récupéré:', this.token);  // Affichage du token dans la console
          this.callApi(token);  // Appel à l'API avec le token
        });
      })
      .catch((error) => {
        console.error('Erreur de connexion:', error);
      });
  }

  // Fonction pour appeler l'API protégée avec le token
  callApi(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:3000/protected', { headers })
      .subscribe(
        (response) => {
          console.log('Réponse de l\'API protégée:', response);
        },
        (error) => {
          console.error('Erreur lors de l\'accès à l\'API protégée:', error);
        }
      );
  }
}
