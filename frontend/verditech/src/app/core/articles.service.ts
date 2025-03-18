import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Article } from './model/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private API_URL = 'http://localhost:3000/articles';
  private articlesSignal = signal<Article[]>([]);  // Spécifier que c'est un signal d'un tableau d'articles

  constructor(private http: HttpClient) {}

  // Récupérer les articles
  getArticles() {
    if (this.articlesSignal().length === 0) {
      this.http.get<Article[]>(this.API_URL).subscribe(articles => {
        this.articlesSignal.set(articles);  // Met à jour le signal avec les articles récupérés
      });
    }
    return this.articlesSignal;  // Retourne le signal
  }

  // Ajouter un article
  addArticle(article: any, token: string) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // ✅ Important pour que Express lise le JSON
    };

    return this.http.post(this.API_URL, article, { headers }).pipe(
      tap(() => this.refreshCache()) // Rafraîchit les articles après ajout
    );
  }

  // Mettre à jour un article
  updateArticle(id: string, article: any, token: string) {
    return this.http.put(`${this.API_URL}/${id}`, article, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(() => this.refreshCache()) // Rafraîchit les articles après mise à jour
    );
  }

  // Supprimer un article
  deleteArticle(id: string, token: string) {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(() => this.refreshCache()) // Rafraîchit les articles après suppression
    );
  }

  // Rafraîchir le cache
  private refreshCache() {
    this.http.get<Article[]>(this.API_URL).subscribe(articles => {
      this.articlesSignal.set(articles);  // Met à jour le signal
    });
  }
}
