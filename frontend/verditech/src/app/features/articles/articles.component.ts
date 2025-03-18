import {Component, signal, Signal} from '@angular/core';
import {ArticlesService} from '../../core/articles.service';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {Article} from '../../core/model/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  /**
   * Liste des articles
   */
  articlesSignal: Signal<Article[]> = signal([]);

  /**
   * Constructeur
   * @param articlesService
   */
  constructor(private articlesService: ArticlesService) {
    this.articlesSignal = this.articlesService.getArticles();
  }

  /**
   * Méthode pour suivre les articles par leur id (optimisation de la détection de changements)
   */
  trackByArticleId(index: number, article: any): number {
    return article.id;
  }

}
