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
const stuffRoutes = require('.routes/stuff'); //importation du router stuff

mongoose.connect('mongodb+srv://m40282897:ma-gra12@cluster0.7q1vrxe.mongodb.net/nom_de_ta_base?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(' Connexion à MongoDB réussie !'))
  .catch((err) => console.error(' Connexion à MongoDB échouée !', err));


app.use(bodyParser.json()); // Middleware pour analyser le corps des requêtes JSON  

app.use('/api/stuff', stuffRoutes); // Utilisation du router pour les requêtes vers /api/stuff


// Middleware CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // autorise toutes les origines
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



module.exports = app;




//CORS signifie « Cross Origin Resource Sharing ». Il s'agit d'un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents, ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles