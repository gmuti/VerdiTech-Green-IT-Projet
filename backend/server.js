const express = require('express');
const bodyParser = require('body-parser');
const firebaseAdmin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

// Initialiser Firebase Admin SDK
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

// Initialiser l'application Express
const app = express();
const port = 3000;

// Importer les routes d'articles
const articleRoutes = require('./routes/articles');
// Middleware pour parser le body des requêtes HTTP
app.use(bodyParser.json());

// Route pour tester la connexion à Firebase
app.get('/', (req, res) => {
    res.send('API Backend is up and running!');
});

// Route protégée (requérant l'authentification Firebase)
app.get('/protected', async (req, res) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return res.status(401).send('No token provided');
    }

    try {
        // Vérifier le token Firebase
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        res.status(200).send(`Hello, ${decodedToken.name}`);
    } catch (error) {
        res.status(401).send('Invalid or expired token');
    }
});

// Intégration des routes d'articles dans le serveur
app.use('/articles', articleRoutes);

// Lancer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
