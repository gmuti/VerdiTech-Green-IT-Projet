const firebaseAdmin = require('firebase-admin');

// vérifier l'authentification de l'utilisateur via Firebase ID Token
module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).send('Invalid or expired token');
    }
};