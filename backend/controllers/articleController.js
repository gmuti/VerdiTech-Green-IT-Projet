
const db = require('firebase-admin').firestore();

// Récupérer tous les articles
exports.getArticles = async (req, res) => {
    try {
        const snapshot = await db.collection('articles').get();
        const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(articles);
    } catch (error) {
        res.status(500).send('Error retrieving articles: ' + error.message);
    }
};

// Récupérer un article spécifique par son ID
exports.getArticleById = async (req, res) => {
    const articleId = req.params.id;

    if (!articleId) {
        return res.status(400).send('Article ID is required');
    }

    try {
        const articleRef = db.collection('articles').doc(articleId);
        const doc = await articleRef.get();

        if (!doc.exists) {
            return res.status(404).send('Article not found');
        }

        res.status(200).json(doc.data());  // Renvoie les données de l'article
    } catch (error) {
        res.status(500).send('Error retrieving article: ' + error.message);
    }
};

// Créer un nouvel article
exports.createArticle = async (req, res) => {
    const { title, content, imageUrl } = req.body;

    // Valider les données
    if (!title || !content || !imageUrl) {
        return res.status(400).send('Title, content, and imageUrl are required');
    }

    try {
        const newArticle = await db.collection('articles').add({
            title,
            content,
            imageUrl,
            createdAt: new Date(),
        });

        res.status(201).send(`Article created with ID: ${newArticle.id}`);
    } catch (error) {
        res.status(500).send('Error creating article: ' + error.message);
    }
};

// Mettre à jour un article spécifique
exports.updateArticle = async (req, res) => {
    const articleId = req.params.id;
    const { title, content, imageUrl } = req.body;

    // Valider les données
    if (!title || !content || !imageUrl) {
        return res.status(400).send('Title, content, and imageUrl are required');
    }

    try {
        const articleRef = db.collection('articles').doc(articleId);
        const doc = await articleRef.get();

        if (!doc.exists) {
            return res.status(404).send('Article not found');
        }

        await articleRef.update({
            title,
            content,
            imageUrl,
            updatedAt: new Date(),
        });

        res.send('Article updated successfully');
    } catch (error) {
        res.status(500).send('Error updating article: ' + error.message);
    }
};

// Supprimer un article spécifique
exports.deleteArticle = async (req, res) => {
    const articleId = req.params.id;

    try {
        const articleRef = db.collection('articles').doc(articleId);
        const doc = await articleRef.get();

        if (!doc.exists) {
            return res.status(404).send('Article not found');
        }

        await articleRef.delete();
        res.send('Article deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting article: ' + error.message);
    }
};
