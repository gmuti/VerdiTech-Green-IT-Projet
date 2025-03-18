import {Component, OnInit, signal} from '@angular/core';
import { ArticlesService } from '../../core/articles.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Signal } from '@angular/core';  // Importer Signal
import { Article } from '../../core/model/article.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  imports: [FormsModule, NgIf, NgForOf],
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  articlesSignal: Signal<Article[]> = signal([]);
  newArticle = { title: '', content: '', imageUrl: '' };
  token: string | null = null;
  isEditing = false;
  isFormVisible = false;
  editedArticle: any = null;

  constructor(private articlesService: ArticlesService, private authService: AuthService) {}

  ngOnInit() {
    this.token = this.authService.getToken();
    this.loadArticles();
  }

  loadArticles() {
    this.articlesSignal = this.articlesService.getArticles();
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
    this.isEditing = false;
    this.newArticle = { title: '', content: '', imageUrl: '' };
  }

  addArticle() {
    if (!this.token) return alert("Vous devez être connecté !");
    this.articlesService.addArticle(this.newArticle, this.token).subscribe({
      next: () => {
        this.newArticle = { title: '', content: '', imageUrl: '' };
        this.loadArticles();  // Recharge les articles après ajout
        this.isFormVisible = false;
      },
      error: err => {
        console.error("❌ Erreur d'ajout :", err);
        this.isFormVisible = false;
      }
    });
  }

  editArticle(article: any) {
    this.isEditing = true;
    this.isFormVisible = true;
    this.editedArticle = { ...article };
    this.newArticle = { ...article };
  }

  saveArticle() {
    if (!this.token) return alert("Vous devez être connecté !");
    this.articlesService.updateArticle(this.editedArticle.id, this.newArticle, this.token).subscribe({
      next: () => {
        this.isFormVisible = false;
        this.isEditing = false;
        this.newArticle = { title: '', content: '', imageUrl: '' };
        this.editedArticle = null;
        this.loadArticles();  // Recharge les articles après mise à jour
      },
      error: err => {
        console.error("❌ Erreur de mise à jour :", err);
        this.isFormVisible = false;
      }
    });
  }

  deleteArticle(id: string) {
    if (!this.token) return alert("Vous devez être connecté !");
    this.articlesService.deleteArticle(id, this.token).subscribe(() => {
      this.loadArticles();  // Recharge les articles après suppression
    });
  }

  cancelEdit() {
    this.isFormVisible = false;
    this.isEditing = false;
    this.newArticle = { title: '', content: '', imageUrl: '' };
  }
}
