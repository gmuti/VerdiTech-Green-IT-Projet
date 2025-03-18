import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../core/articles.service';
import { Article } from '../../core/model/article.model';
import { signal, Signal } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  darkMode = false;
  searchQuery = '';
  carouselImages = [
    'https://www.ratbacher.de/fileadmin/_processed_/4/6/csm_green-it-teaser_d2862e3275.jpg',
    'https://static.vecteezy.com/system/resources/previews/006/514/751/non_2x/green-computing-green-technology-green-it-csr-and-it-ethics-concept-photo.jpg',
    'https://www.ratbacher.de/fileadmin/_processed_/4/6/csm_green-it-teaser_d2862e3275.jpg',
    'https://static.vecteezy.com/system/resources/previews/006/514/751/non_2x/green-computing-green-technology-green-it-csr-and-it-ethics-concept-photo.jpg',
    'https://www.ratbacher.de/fileadmin/_processed_/4/6/csm_green-it-teaser_d2862e3275.jpg'
  ];

  currentImageIndex = 0;
  articlesSignal: Signal<Article[]> = signal([]);

  sections = [
    {
      title: 'Augmenter la durée de vie des équipements',
      content: 'Nous proposons des produits reconditionnés et réparables, afin de limiter l’achat de nouveaux équipements et la production de déchets électroniques.',
      open: false
    },
    {
      title: 'Réduire l’empreinte énergétique',
      content: 'Nos solutions incluent des équipements à faible consommation d’énergie, ainsi que des pratiques pour optimiser l’efficacité énergétique de vos infrastructures.',
      open: false
    },
    {
      title: 'Choisir des hébergeurs écologiques',
      content: 'Nous privilégions des partenaires utilisant des énergies renouvelables et optimisant l’utilisation de leurs data centers pour un hébergement web plus vert.',
      open: false
    },
    {
      title: 'Encourager le télétravail',
      content: 'Nous soutenons le télétravail pour réduire les déplacements professionnels et la consommation de ressources liées aux trajets.',
      open: false
    }
  ];

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    // Récupérer les articles au démarrage du composant
    this.articlesSignal = this.articlesService.getArticles();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  toggleSection(index: number) {
    this.sections[index].open = !this.sections[index].open;
  }

  viewArticle(article: Article) {
    alert(`Vous avez sélectionné l'article : ${article.title}`);
  }

  contactUs() {
    alert('Contactez-nous pour plus d\'informations sur nos solutions Green IT.');
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
  }
}
