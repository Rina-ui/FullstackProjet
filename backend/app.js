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
const Thing = require('./models/Thing');

mongoose.connect('mongodb+srv://m40282897:ma-gra12@cluster0.7q1vrxe.mongodb.net/nom_de_ta_base?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(' Connexion à MongoDB réussie !'))
  .catch((err) => console.error(' Connexion à MongoDB échouée !', err));


app.use(express.json()); // Middleware pour analyser le corps des requêtes JSON



// Middleware CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // autorise toutes les origines
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/stuff', (req, res, next) => {
 delete req.body._id;
 const thing = new Thing({
  ...req.body //methode spread don pas besion d'ecrire tous les arguments 
 });
 thing.save() //La méthode save() renvoie une Promise
  .then(() => res.status(201).json({message: 'Objet enregistre'}))
  .catch(error => res.status(400).json({EvalError: 'Erreur d\'enregistrement'}));
});


//modification d'un objet
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
})

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

  
  // Route API
app.get('/api/stuff', (req, res, next) => {
    
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
   
});
  
  module.exports = app;
  

module.exports = app;




//CORS signifie « Cross Origin Resource Sharing ». Il s'agit d'un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents, ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles