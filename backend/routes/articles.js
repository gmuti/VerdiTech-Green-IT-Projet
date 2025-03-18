
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour obtenir tous les articles
router.get('/', articleController.getArticles);

// Route pour obtenir un article par ID
router.get('/:id', articleController.getArticleById);

// Route pour créer un article (requiert une authentification)
router.post('/', authMiddleware, articleController.createArticle);

// Route pour mettre à jour un article (requiert une authentification)
router.put('/:id', authMiddleware, articleController.updateArticle);

// Route pour supprimer un article (requiert une authentification)
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;
