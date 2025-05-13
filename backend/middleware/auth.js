const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Authorization header manquant');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token manquant');
        }

        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        req.user = { userId: decodedToken.userId };
        next();
    } catch (error) {
        console.log('Erreur auth middleware :', error.message);
        res.status(401).json({ message: 'Requête non authentifiée', error: error.message });
    }
};
