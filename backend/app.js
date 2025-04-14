const express = require('express');

const app = express();

// //la fonction next permet de renvoyer la requete à la prochaine fonction middleware
// app.use((req, res, next) =>{
//     console.log('Requête reçue !');
//     next();
// })

// app.use((req, res, next) =>{
//     res.status(201);
//     next();
// })

// app.use((req, res, next) =>{
//     res.json({message: 'La requete a bien été reçue'});
//     next();
// })

// app.use((req, res)=>{
//     console.log('Réponse envoyée avec succès !');
// })

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jimbob:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); // Middleware pour analyser le corps des requêtes JSON


// Middleware CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet cree !'
  });

});
  
  // Route API
  app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oejfoejf',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2016/11/18/12/24/cat-1848500_1280.jpg', // OK
        price: 5000,
        userId: 'fyewteriuer',
      },
      {
        _id: 'oejfoejfyu',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg', // NOUVELLE IMAGE OK
        price: 5000000,
        userId: 'fyewter',
      },
    ];
    res.status(200).json(stuff);
  });
  
  module.exports = app;
  

module.exports = app;




//CORS signifie « Cross Origin Resource Sharing ». Il s'agit d'un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents, ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles