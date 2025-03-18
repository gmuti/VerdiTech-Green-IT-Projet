import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      console.warn("🔒 Accès refusé - Redirection vers la page de connexion");
      this.router.navigate(['/auth']); // ✅ Redirection vers la page de connexion
      return false;
    }
  }
}
