import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgIf} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  imports: [
    FormsModule,
    AsyncPipe,
    NgIf
  ],
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email: string = '';
  password: string = '';

  constructor(protected authService: AuthService, private http: HttpClient, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      token => {
        console.log('Utilisateur connecté, token:', token);
        this.callApi(token);
        this.router.navigate(['/admin']); // ✅ Redirection vers Home après connexion
      },
      error => console.error('Erreur de connexion:', error)
    );
  }

  logout() {
    this.authService.logout();
    console.log('Utilisateur déconnecté');
  }

  callApi(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:3000/protected', { headers })
      .subscribe(
        response => console.log('Réponse de l\'API protégée:', response),
        error => console.error('Erreur API:', error)
      );
  }
}
