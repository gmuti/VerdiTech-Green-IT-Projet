
const express = require('express');
const bodyParser = require('body-parser');
const firebaseAdmin = require('firebase-admin');
const cors = require('cors');
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

app.use(cors({
    origin: 'http://localhost:4200'  // Autoriser uniquement les requêtes venant de cette origine
}));

// Middleware pour parser le body des requêtes HTTP
app.use(bodyParser.json());

// Route pour tester la connexion à Firebase
app.get('/', (req, res) => {
    res.send('API Backend is up and running!');
});

// Route protégée (requérant l'authentification Firebase)
app.get('/protected', async (req, res) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    console.log("Token reçu :", idToken); // Affiche le token dans la console pour vérifier sa validité

    if (!idToken) {
        return res.status(401).send('No token provided');
    }

    try {
        // Vérifier le token Firebase
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        console.log("Token décodé : ", decodedToken); // Afficher le contenu du token

        res.status(200).send(`Hello, ${decodedToken.name}`);
    } catch (error) {
        console.error("Erreur de vérification du token :", error);
        res.status(401).send('Invalid or expired token');
    }
});


// Intégration des routes d'articles dans le serveur
app.use('/articles', articleRoutes);

// Lancer le serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
