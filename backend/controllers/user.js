const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User'); //importation du model User

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({error}))
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect' });
                        } else {
                            // Utilisation de user._id et non user_id
                            return res.status(200).json({
                                userId: user._id,  // Utilise _id de l'utilisateur
                                token: jwt.sign(
                                    {
                                        userId: user._id  // Utilise _id ici aussi
                                    },
                                    'RANDOM_TOKEN_SECRET', // Ta clé secrète
                                    {
                                        expiresIn: '24h' // Durée de validité du token
                                    }
                                )
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    });
            }
        })
        .catch(error => res.status(500).json({ error }));
};


//Nous utilisons la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données :
//La méthode sign() du package jsonwebtoken utilise une clé secrète pour chiffrer un token qui peut contenir un payload personnalisé et avoir une validité limitée.