import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AsyncPipe, NgIf} from '@angular/common';
import {AuthService} from './core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'verditech';

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
