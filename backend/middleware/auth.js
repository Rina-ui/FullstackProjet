const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        //recuperation du token et le splitter
        const token = req.headers.authorization.split('')[1];
        //decoder le tolen et le verifier
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //recuperation de l'userId
        const userId = decodedToken.userId;
        req.auth ={
            userId: userId
        };

        
    }
    catch(error){
        res.status(401).json(
            {error}
        );
    }
}