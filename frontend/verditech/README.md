# 🌿 VerdiTech - Un projet Green IT

## 🌎 Présentation du projet

VerdiTech est une application web vitrine pour une entreprise fictive qui promeut les services technologiques écologiques. Notre objectif est d'appliquer les bonnes pratiques du Green IT en réduisant la consommation énergétique du site tout en garantissant une excellente expérience utilisateur.

Ce projet inclut :

- Une page d'accueil mettant en avant nos prestations.
- Un blog d'articles sur les pratiques écoresponsables.
- Une interface d'administration sécurisée pour la gestion des articles.
- Une authentification via Firebase pour protéger l'accès à l'administration.

## ⚙️ Technologies utilisées

Nous avons sélectionné des technologies adaptées aux principes du Green IT :

### Frontend (Angular)

- Angular (framework performant et optimisé)
- Lazy Loading pour éviter de charger du contenu inutile
- RxJS pour la gestion réactive des données
- SCSS avec des styles minimaux pour réduire le poids des fichiers CSS

### Backend (Node.js + Firebase)

- Node.js + Express.js pour un serveur léger et efficace
- Firebase Authentication pour une gestion simplifiée des utilisateurs
- Firestore comme base de données NoSQL évolutive et optimisée
- CORS activé pour gérer les requêtes entre le frontend et le backend

### Base de données

- Firestore (Firebase) : une solution serverless et optimisée énergétiquement

## 🏗 Architecture du projet

Nous avons structuré le projet en respectant les principes d'éco-conception logicielle :


## 🚀 Installation et exécution du projet

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/ton-utilisateur/ton-repo.git
cd ton-repo
```
## 📌 Frontend
```cd frontend
npm install
ng serve
```

## 📌 Backend
```cd backend
npm install
node server.js
```

====================================================================================================

# 🌱 Pratiques Green IT et Justification des Choix Techniques

## 📖 Introduction
Ce projet a été conçu en intégrant des pratiques **Green IT** pour réduire son empreinte écologique. Ce document détaille les **pratiques éco-responsables appliquées**, les **choix techniques** justifiés, ainsi que les **pratiques Green IT qui auraient été adoptées si le projet avait été mené jusqu'au bout**.

---

## 🌿 1. Pratiques Green IT appliquées lors du codage du site

### 1️⃣ Optimisation du Code
✅ **Réduction de la complexité algorithmique** : Minimisation des boucles et calculs inutiles pour réduire l'utilisation du CPU.  
✅ **Gestion efficace de la mémoire** : Utilisation de `NgRx` pour éviter des re-rendus inutiles et stocker en cache les articles.  
✅ **Utilisation de caches** : Stockage des articles en mémoire locale avec `BehaviorSubject` pour limiter les appels Firestore.

#### 📌 Exemple d'utilisation de NgRx pour éviter les re-rendus inutiles (sur une branche à part)
```typescript
export const selectAllLivres = createSelector(
  selectLivresState,
  (state) => state.livres
);
```
### 2️⃣  Éco-conception des Applications
✅ **Minimisation du trafic réseau** : Compression des images et utilisation du format WebP.

✅ **Optimisation des requêtes Firestore** : Utilisation d'index Firestore pour accélérer les recherches.

✅ **Lazy Loading** : Chargement dynamique des modules Angular uniquement lorsque nécessaire.

### 📌 Exemple d'optimisation des images avec Lazy Loading
```html
<img *ngIf="article.imageUrl" [src]="article.imageUrl" alt="Image de l'article" width="200" loading="lazy">
```
### 3️⃣ Efficience des Infrastructures
✅ **Développement Cloud-friendly** : Utilisation de Firebase Firestore, qui ajuste dynamiquement l’infrastructure selon la charge.
✅ **Adoption de technologies écoénergétiques** : Utilisation d'Angular et Firestore, qui nécessitent moins de gestion côté serveur.

### 🔍 2. Justification des choix techniques
**🔹 Pourquoi Angular et NgRx ?**

Angular avec NgRx permet une gestion centralisée de l'état, ce qui évite des re-rendus inutiles et réduit la consommation CPU.

**🔹 Pourquoi Firestore et Express ?**

Firestore est serverless, il ne consomme des ressources que lorsqu’il est sollicité.
Express.js permet une gestion efficace des routes backend et optimise la communication avec la base de données.
**🔹 Pourquoi le stockage en cache ?**

Réduction des appels API.
Accélération de l’affichage côté utilisateur.
Moins de consommation d’énergie sur le réseau.
**🔹 Pourquoi le mode sombre ?**

Les écrans OLED consomment jusqu’à 30% d’énergie en moins avec un mode sombre activé.

### 📌 Exemple d'implémentation du mode sombre
typescript
Copier
Modifier

```typescript
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}
```

🌍 3. Pratiques Green IT que nous aurions utilisées si le projet avait été mené jusqu’au bout
**🔹 Infrastructure Matériel**

Utilisation d’équipements labellisés basse consommation.
Mise en place d’une politique de réemploi pour prolonger la durée de vie du matériel.

**🔹 Infrastructure Datacenters**

Hébergement sur un serveur alimenté par des énergies renouvelables.
Activation de l’autoscaling pour éviter la consommation inutile de ressources.

**🔹 Impressions papier**

Sensibilisation à la réduction des impressions et utilisation du format numérique.
Promotion du format PDF interactif plutôt que de l’impression classique.

**🔹 Gouvernance**

Intégration de critères Green IT dans la politique de l'entreprise.
Formation des employés aux pratiques numériques responsables.

**🔹 Services numériques et applications**

Intégration de protocoles économes en énergie (ex: HTTP/2, WebP, Brotli).
Optimisation de l’accessibilité et de la sobriété numérique.

### 📌 Exemple d'optimisation des requêtes backend avec Express.js

```typescript
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

const db = admin.firestore();
app.get('/articles', async (req, res) => {
    const snapshot = await db.collection('articles').get();
    res.send(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

app.listen(3000, () => console.log('✅ Serveur Express lancé sur http://localhost:3000'));
```

### 🚀 4. Mise en production et gouvernance Green IT
**🔹 Choix des serveurs**

L’hébergement aurait été réalisé sur un fournisseur écoresponsable tel que :
Infomaniak (serveurs alimentés en énergies renouvelables).
Scaleway (offre Green IT).

**🔹 Monitoring & Performance**

Suivi des logs Firebase et Express pour optimiser les performances.
Utilisation de Google Lighthouse pour auditer la consommation énergétique.

**🔹 Optimisation des ressources serveur**

Mise en place d’une mise en cache des ressources statiques.
Minimisation des scripts inutiles.

