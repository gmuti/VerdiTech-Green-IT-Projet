import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ArticlesComponent } from './features/articles/articles.component';
import { ContactComponent } from './features/contact/contact.component';
import { AdminComponent } from './features/admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '/home' }
];
