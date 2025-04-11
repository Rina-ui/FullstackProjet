const express = require('express');

const app = express();

//la fonction next permet de renvoyer la requete à la prochaine fonction middleware
app.use((req, res, next) =>{
    console.log('Requête reçue !');
    next();
})

app.use((req, res, next) =>{
    res.status(201);
    next();
})

app.use((req, res, next) =>{
    res.json({message: 'La requete a bien été reçue'});
    next();
})

app.use((req, res)=>{
    console.log('Réponse envoyée avec succès !');
})

module.exports = app;

