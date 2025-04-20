const express = require('express');
const router = express.Router();

const Thing = require('../models/Thing'); //importation du model Thing

router.post('/', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
     ...req.body //methode spread don pas besion d'ecrire tous les arguments 
    });
    thing.save() //La méthode save() renvoie une Promise
     .then(() => res.status(201).json({message: 'Objet enregistre'}))
     .catch(error => res.status(400).json({EvalError: 'Erreur d\'enregistrement'}));
   });
   
   
   //modification d'un objet
router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(201).json({ message: 'Objet modifié !' }))
       .catch(error => res.status(400).json({ error }));
})
   
   //supression d'un objet
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.param.id})
       .then(() => res.status(200).json({message: 'Objet supprime!'}))
       .catch(error => res.status(400).json(errror));
})
   
router.get('/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
       .then(thing => res.status(200).json(thing))
       .catch(error => res.status(404).json({ error }));
});
   
     
     // Route API
router.get('/', (req, res, next) => {    
    Thing.find()
       .then(things => res.status(200).json(things))
       .catch(error => res.status(400).json({ error }));
      
});

module.exports = router; //exportation du router