const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff'); //importation du model Thing

router.post('/', stuffCtrl.createThing); //route pour la creation d'un objet);
   
   
   //modification d'un objet
router.put('/:id', stuffCtrl.modifyThing);
   
   //supression d'un objet
router.delete('/:id', stuffCtrl.deleteThing)
   
//recuperation d'un objet
router.get('/:id', stuffCtrl.getOneThing);
   
     
    // Route API
router.get('/', stuffCtrl.getAllThings); //route pour la recuperation de tous les objets

module.exports = router;